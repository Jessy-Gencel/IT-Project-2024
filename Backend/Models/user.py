class User:
    def __init__(self, user_id: str, email: str, password: str, username: str, 
                 role: str, major: str, DOB: str, year: int, mbti: str, interests: list, 
                 hobbies: list, books: list, movies: list, music: list, games: list):
        self.id = "user::" + user_id
        self.email = email
        self.password = password
        self.username = username
        self.role = role
        self.major = major
        self.dateOfBirth = DOB
        self.year = year
        self.mbti = mbti
        self.interests = interests
        self.hobbies = hobbies
        self.books = books
        self.movies = movies
        self.music = music
        self.games = games
        self.chats = []
        self.organisedEvents = []
        self.interestedEvents = []



