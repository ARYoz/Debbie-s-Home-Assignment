package recsys;

import java.util.*;
import java.util.stream.Collectors;

/** Abstract generic recommender system. */
abstract class RecommenderSystem<T extends Item> {
    protected final Map<Integer, User> users;
    protected final Map<Integer, T> items;
    protected final List<Rating<T>> ratings;

    // מבני עזר – מומלץ לקריאות וביצועים
    protected final Map<Integer, List<Rating<T>>> ratingsByUser;
    protected final Map<Integer, List<Rating<T>>> ratingsByItem;

    protected final int NUM_OF_RECOMMENDATIONS = 10;

    protected RecommenderSystem(Map<Integer, User> users,
                                Map<Integer, T> items,
                                List<Rating<T>> ratings) {
        this.users = users;
        this.items = items;
        this.ratings = ratings;

        // מיפוי דירוגים לפי משתמש
        this.ratingsByUser = ratings.stream()
                .collect(Collectors.groupingBy(Rating::getUserId));

        // מיפוי דירוגים לפי מזהה פריט
        this.ratingsByItem = ratings.stream()
                .collect(Collectors.groupingBy(Rating::getItemId));
    }

    /** @return top‑10 recommended items for the given user, sorted best‑first. */
    public abstract List<T> recommendTop10(int userId);
}
