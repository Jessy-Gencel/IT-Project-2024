from Services.embedding import make_all_vectors,BERT_MODEL,BERT_TOKENIZER
vectors = {
    "interest": ["running", "parkouring"],
    "game": ["zumba", "tower defense"],
    "music": ["heavy metal", "nothing by fabvl"],
    "movie": ["Lord of the rings", "Harry Potter"],
    "hobby": ["ice skating, reading"],
    "book": ["Erebos"]
}
mbti = "INFP"
make_all_vectors(vectors, mbti, 1, BERT_TOKENIZER, BERT_MODEL)
vectors1 = {
    "interest": ["climbing", "hiking"],
    "game": ["tower defense", "minecraft"],
    "music": ["heavy metal", "rock"],
    "movie": ["Harry Potter", "Inception"],
    "hobby": ["ice skating", "reading"],
    "book": ["The Hobbit"]
}
mbti1 = "INTJ"
make_all_vectors(vectors1, mbti1, 2, BERT_TOKENIZER, BERT_MODEL)
vectors2 = {
    "interest": ["trail running", "exploring nature"],
    "game": ["zumba", "league of legends"],
    "music": ["metal", "alternative rock"],
    "movie": ["Lord of the Rings", "Interstellar"],
    "hobby": ["writing", "reading"],
    "book": ["Mistborn"]
}
mbti2 = "INFJ"
make_all_vectors(vectors2, mbti2, 3, BERT_TOKENIZER, BERT_MODEL)
vectors3 = {
    "interest": ["shopping", "partying"],
    "game": ["call of duty", "fifa"],
    "music": ["pop", "EDM"],
    "movie": ["The Hangover", "Fast & Furious"],
    "hobby": ["dancing", "social media"],
    "book": ["None"]
}
mbti3 = "ESTP"
make_all_vectors(vectors3, mbti3, 4, BERT_TOKENIZER, BERT_MODEL)
vectors4 = {
    "interest": ["hiking", "meditation"],
    "game": ["chess", "Stardew Valley"],
    "music": ["classical", "instrumental"],
    "movie": ["Pride and Prejudice", "The Secret Life of Walter Mitty"],
    "hobby": ["reading", "gardening"],
    "book": ["War and Peace"]
}
mbti4 = "INFJ"
make_all_vectors(vectors4, mbti4, 5, BERT_TOKENIZER, BERT_MODEL)
vectors5 = {
    "interest": ["philisophy", "debating", "religion", "anime"],
    "game": ["Hearts of Iron 4", "Brawlhalla"],
    "music": ["metal", "fabvl"],
    "movie": ["Lord of the Rings", "Mentalist"],
    "hobby": ["gaming", "watching youtube", "reading manwha"],
    "book": ["None"]
}
mbti5 = "ISFJ"
make_all_vectors(vectors5, mbti5, 6, BERT_TOKENIZER, BERT_MODEL)