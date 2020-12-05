class film{
    constructor(engName,vieName,urlVideo,image,largeImage,actors,country,genres,description){
        this.engName = engName;
        this.vieName = vieName;
        this.urlVideo = urlVideo;
        this.image = image;
        this.largeImage = largeImage;
        this.actors = actors;
        this.country = country;
        this.genres = genres;
        this.description = description;
        this.vote = []
        this.comment = []
        this.dateUpdate = new Date().getTime()
    }
}

module.exports = film