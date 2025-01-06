def get_changed_traits_unordered(incoming_profile_traits:dict, db_profile_traits:dict):
    """
    Compare incoming traits with database traits, ignoring order, and return the changed traits.
    Args:
        incoming_profile (dict): The new profile data (from request).
        db_profile (dict): The existing profile data (from database).
    Returns:
        dict: Traits that have changed.
    """
    # Initialize a dictionary for storing changed traits
    changed_traits = {}

    # Compare each trait in the incoming profile
    for key, incoming_values in incoming_profile_traits.items():
        db_values = db_profile_traits.get(key, [])
        # Compare the sets (order-insensitive comparison)
        if set(incoming_values) != set(db_values):
            changed_traits[key] = incoming_values

    return changed_traits