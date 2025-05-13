package recsys;

import java.util.*;
import java.util.stream.Collectors;

class PopularityBasedRecommender<T extends Item> extends RecommenderSystem<T> {
    private static final int POPULARITY_THRESHOLD = 100;

    public PopularityBasedRecommender(Map<Integer, User> users,
                                      Map<Integer, T> items,
                                      List<Rating<T>> ratings) {
        super(users, items, ratings);
    }

    @Override
    public List<T> recommendTop10(int userId) {
        Set<Integer> ratedByUser = ratings.stream()
                .filter(r -> r.getUserId() == userId)
                .map(Rating::getItemId)
                .collect(Collectors.toSet());

        return ratings.stream()
                .collect(Collectors.groupingBy(
                        Rating::getItemId
                ))
                .entrySet().stream()
                .filter(e -> e.getValue().size() >= POPULARITY_THRESHOLD)
                .filter(e -> !ratedByUser.contains(e.getKey()))
                .map(e -> {
                    T item = items.get(e.getKey());
                    double avg = e.getValue().stream()
                            .mapToDouble(Rating::getRating)
                            .average()
                            .orElse(0.0);
                    return new AbstractMap.SimpleEntry<>(item, avg);
                })
                .sorted(Comparator.<Map.Entry<T, Double>>comparingDouble(Map.Entry::getValue).reversed()
                        .thenComparing(e -> getItemRatingsCount(e.getKey().getId()), Comparator.reverseOrder())
                        .thenComparing(e -> e.getKey().getName()))
                .limit(NUM_OF_RECOMMENDATIONS)
                .map(Map.Entry::getKey)
                .collect(Collectors.toList());
    }


    public double getItemAverageRating(int itemId) {
        return ratings.stream()
                .filter(r -> r.getItemId() == itemId)
                .mapToDouble(Rating::getRating)
                .average()
                .orElse(0.0);
    }


    public int getItemRatingsCount(int itemId) {
        return (int) ratings.stream()
                .filter(r -> r.getItemId() == itemId)
                .count();
    }
}
