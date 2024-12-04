from Services.embedding import embed_MiniLM
vectors1 = {
    "interest": ["science fiction", "philosophy", "space exploration"],
    "game": ["Kerbal Space Program", "Civilization VI"],
    "music": ["classical", "Hans Zimmer"],
    "movie": ["Interstellar", "Dune"],
    "hobby": ["stargazing", "writing", "reading sci-fi"],
    "book": ["Dune", "Hyperion"]
}
mbti1 = "INTP"
embed_MiniLM(mbti=mbti1, id=1, category_dict=vectors1)

# Very similar profile to User 1
vectors2 = {
    "interest": ["science fiction", "philosophy", "astronomy"],
    "game": ["Stellaris", "Civilization VI"],
    "music": ["orchestral", "movie soundtracks"],
    "movie": ["Interstellar", "Contact"],
    "hobby": ["stargazing", "writing", "astronomy"],
    "book": ["The Martian", "Rendezvous with Rama"]
}
mbti2 = "INTJ"
embed_MiniLM(mbti=mbti2, id=2, category_dict=vectors2)

# Profile that varies significantly (fitness/sports)
vectors3 = {
    "interest": ["fitness", "traveling", "sports", "nutrition"],
    "game": ["FIFA", "NBA 2K"],
    "music": ["pop", "workout playlists"],
    "movie": ["Rocky", "Coach Carter"],
    "hobby": ["gym", "hiking", "team sports"],
    "book": ["Fit for Life", "Born to Run"]
}
mbti3 = "ESTP"
embed_MiniLM(mbti=mbti3, id=3, category_dict=vectors3)

# Another significantly different profile (business/tech)
vectors4 = {
    "interest": ["business", "technology", "entrepreneurship", "investing"],
    "game": ["Startup Panic", "Stock Market Simulator"],
    "music": ["electronic", "productivity playlists"],
    "movie": ["The Social Network", "Wall Street"],
    "hobby": ["coding", "networking", "podcast listening"],
    "book": ["Zero to One", "The Lean Startup"]
}
mbti4 = "ENTJ"
embed_MiniLM(mbti=mbti4, id=4, category_dict=vectors4)

# Baseline user with strong matches to Users 1 and 2
vectors5 = {
    "interest": ["working out", "runnning", "mountain climbing"],
    "game": ["Hearts of ironIV", "Fifa 24"],
    "music": ["game soundtracks", "heavy metal"],
    "movie": ["Interstellar", "Contact"],
    "hobby": ["gym", "hiking", "watching youtube videos", "Learning languages"],
    "book": ["Lord of the rings", "The Martian"]
}
mbti5 = "INTJ"
embed_MiniLM(mbti=mbti5, id=5, category_dict=vectors5)