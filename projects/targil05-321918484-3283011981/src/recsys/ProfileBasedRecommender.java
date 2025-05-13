package recsys;

import java.util.*;
import java.util.stream.Collectors;

class ProfileBasedRecommender<T extends Item> extends RecommenderSystem<T> {

    public ProfileBasedRecommender(Map<Integer, User> users,
                                   Map<Integer, T> items,
                                   List<Rating<T>> ratings) {
        super(users, items, ratings);
    }

    @Override
    public List<T> recommendTop10(int userId) {
        Set<Integer> ratedItemIds = ratings.stream()
                .filter(r -> r.getUserId() == userId)
                .map(Rating::getItemId)
                .collect(Collectors.toSet());

        Set<Integer> matchingUserIds = getMatchingProfileUsers(userId).stream()
                .map(User::getId)
                .collect(Collectors.toSet());

        return ratings.stream()
                .filter(r -> matchingUserIds.contains(r.getUserId()))
                .collect(Collectors.groupingBy(Rating::getItemId))
                .entrySet().stream()
                .filter(e -> e.getValue().size() >= 5)
                .filter(e -> !ratedItemIds.contains(e.getKey()))
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


    public List<User> getMatchingProfileUsers(int userId) {
        User currentUser = users.get(userId);
        return users.values().stream()
                .filter(u -> u.getId() != userId)
                .filter(u -> Objects.equals(u.getGender(), currentUser.getGender()))
                .filter(u -> Math.abs(u.getAge() - currentUser.getAge()) <= 5)
                .collect(Collectors.toList());
    }

    private int getItemRatingsCount(int itemId) {
        return (int) ratings.stream()
                .filter(r -> r.getItemId() == itemId)
                .count();
    }
}
