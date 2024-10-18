from Services.embedding import load_bert, get_embeddings_for_all_categories

words = [["sleeping","eating","running"],["death","demons","angels"],["1984","brave new world"]]
tokenizer, model = load_bert()
final_vector = get_embeddings_for_all_categories(words,tokenizer,model)
print(final_vector)
print(final_vector.shape)