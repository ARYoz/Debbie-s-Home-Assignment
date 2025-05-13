package recsys;

import java.util.*;
import java.util.function.Function;
import java.util.stream.Collectors;

class SimilarityBasedRecommender<T extends Item> extends RecommenderSystem<T> {

    private final double globalBias;
    private final Map<Integer, Double> itemBiases;
    private final Map<Integer, Double> userBiases;
    private final Map<Integer, Map<Integer, Double>> biasFreeRatings; // userId -> (itemId -> bias-free rating)

    public SimilarityBasedRecommender(Map<Integer, User> users,
                                      Map<Integer, T> items,
                                      List<Rating<T>> ratings) {
        super(users, items, ratings);

        this.globalBias = ratings.stream()
                .mapToDouble(Rating::getRating)
                .average()
                .orElse(0.0);

        this.itemBiases = ratings.stream()
                .collect(Collectors.groupingBy(Rating::getItemId,
                        Collectors.averagingDouble(r -> r.getRating() - globalBias)));

        this.userBiases = ratings.stream()
                .collect(Collectors.groupingBy(Rating::getUserId,
                        Collectors.averagingDouble(r ->
                                r.getRating() - globalBias - itemBiases.getOrDefault(r.getItemId(), 0.0))));

        this.biasFreeRatings = ratings.stream()
                .collect(Collectors.groupingBy(Rating::getUserId,
                        Collectors.toMap(
                                Rating::getItemId,
                                r -> r.getRating() - globalBias
                                        - itemBiases.getOrDefault(r.getItemId(), 0.0)
                                        - userBiases.getOrDefault(r.getUserId(), 0.0)
                        )));
    }


    public double getSimilarity(int u1, int u2) {
        Map<Integer, Double> ratings1 = biasFreeRatings.getOrDefault(u1, Collections.emptyMap());
        Map<Integer, Double> ratings2 = biasFreeRatings.getOrDefault(u2, Collections.emptyMap());

        Set<Integer> commonItems = ratings1.keySet().stream()
                .filter(ratings2::containsKey)
                .collect(Collectors.toSet());

        if (commonItems.size() < 10) {
            return 0.0;
        }

        return commonItems.stream()
                .mapToDouble(itemId -> ratings1.get(itemId) * ratings2.get(itemId))
                .sum();
    }

    @Override
    public List<T> recommendTop10(int userId) {
        Map<Integer, Double> similarityScores = users.keySet().stream()
                .filter(otherId -> otherId != userId)
                .collect(Collectors.toMap(
                        Function.identity(),
                        otherId -> getSimilarity(userId, otherId)
                ));

        List<Integer> topSimilarUsers = similarityScores.entrySet().stream()
                .sorted(Map.Entry.<Integer, Double>comparingByValue().reversed())
                .limit(10)
                .map(Map.Entry::getKey)
                .collect(Collectors.toList());

        Set<Integer> alreadyRated = ratingsByUser.getOrDefault(userId, List.of()).stream()
                .map(Rating::getItemId)
                .collect(Collectors.toSet());

        Map<Integer, List<Double>> weightedRatings = new HashMap<>();

        for (int similarUser : topSimilarUsers) {
            double sim = similarityScores.get(similarUser);
            Map<Integer, Double> otherRatings = biasFreeRatings.getOrDefault(similarUser, Map.of());

            for (Map.Entry<Integer, Double> entry : otherRatings.entrySet()) {
                int itemId = entry.getKey();
                if (alreadyRated.contains(itemId)) continue;

                weightedRatings
                        .computeIfAbsent(itemId, k -> new ArrayList<>())
                        .add(entry.getValue() * sim);
            }
        }

        return weightedRatings.entrySet().stream()
                .filter(e -> e.getValue().size() >= 5)
                .map(e -> {
                    int itemId = e.getKey();
                    double numerator = e.getValue().stream().mapToDouble(Double::doubleValue).sum();
                    double denominator = topSimilarUsers.stream()
                            .mapToDouble(uid -> similarityScores.getOrDefault(uid, 0.0))
                            .sum();
                    double weightedAvg = denominator == 0.0 ? 0.0 : numerator / denominator;

                    double finalRating = weightedAvg
                            + globalBias
                            + itemBiases.getOrDefault(itemId, 0.0)
                            + userBiases.getOrDefault(userId, 0.0);

                    return new AbstractMap.SimpleEntry<>(items.get(itemId), finalRating);
                })
                .sorted(Comparator.<Map.Entry<T, Double>>comparingDouble(Map.Entry::getValue).reversed()
                        .thenComparing(e -> getItemRatingsCount(e.getKey().getId()), Comparator.reverseOrder())
                        .thenComparing(e -> e.getKey().getName()))
                .limit(NUM_OF_RECOMMENDATIONS)
                .map(Map.Entry::getKey)
                .collect(Collectors.toList());
    }

    public void printGlobalBias() {
        System.out.println("Global bias: " + String.format("%.2f", globalBias));
    }

    public void printItemBias(int itemId) {
        System.out.println("recsys.Item bias for item " + itemId + ": " +
                String.format("%.2f", itemBiases.getOrDefault(itemId, 0.0)));
    }

    public void printUserBias(int userId) {
        System.out.println("recsys.User bias for user " + userId + ": " +
                String.format("%.2f", userBiases.getOrDefault(userId, 0.0)));
    }

    private int getItemRatingsCount(int itemId) {
        return ratingsByItem.getOrDefault(itemId, List.of()).size();
    }
    public double getGlobalBias() {
        return globalBias;
    }

    public double getItemBias(int itemId) {
        return itemBiases.getOrDefault(itemId, 0.0);
    }

    public double getUserBias(int userId) {
        return userBiases.getOrDefault(userId, 0.0);
    }

}