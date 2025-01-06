def find_global_top_matches(user1_vectors:dict, user2_vectors:dict, max_matches=5, initial_proximity=2, max_proximity=5):
    # Store global match pool
    match_pool = []

    # Iterate over each category
    for category, user1_array in user1_vectors.items():
        user2_array = user2_vectors.get(category, [])
        proximity = initial_proximity

        # Continue until matches are added or max proximity is reached
        while proximity <= max_proximity:
            # Store potential matches for this category
            category_matches = []
            
            for i, val1 in enumerate(user1_array):
                for j, val2 in enumerate(user2_array):
                    if val1 == val2:
                        # Score matches based on proximity and importance
                        position_score = -abs(i - j)  # Closer positions score higher
                        importance_score = -(i + j)  # Earlier positions score higher
                        total_score = position_score + importance_score
                        category_matches.append((total_score, category, val1, i, j))

            # Sort category matches by score
            category_matches.sort(reverse=True, key=lambda x: x[0])
            
            # Add matches to the global pool
            match_pool.extend(category_matches)
            break  # Do not expand proximity unless explicitly required

        proximity += 2  # Expand proximity if needed

    # Penalize subsequent matches from the same category to promote diversity
    category_penalties = {category: 0 for category in user1_vectors.keys()}
    result = []
    used_categories = set()

    # Select top matches with diversity in mind
    for match in sorted(match_pool, key=lambda x: (x[0] + category_penalties[x[1]]), reverse=True):
        if len(result) >= max_matches:
            break
        score, category, value, _, _ = match

        if category not in used_categories or len([m for m in result if m[1] == category]) < 2:
            result.append((category, value))
            used_categories.add(category)
            category_penalties[category] -= 1  # Apply penalty to same-category matches

    # Construct final dictionary
    final_matches = {}
    for category, value in result:
        if category not in final_matches:
            final_matches[category] = []
        final_matches[category].append(value)

    return final_matches