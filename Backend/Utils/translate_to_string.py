def translate_predefined_vector_to_string(predefined_matching_categories: dict) -> None:
    for key, value in predefined_matching_categories.items():
        predefined_matching_categories[key] = [str(number) for number in value]