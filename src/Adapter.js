class Adapter {
  static getShows (page){
    return fetch(`http://api.tvmaze.com/shows?page=${page}`)
    .then(res => {
      return res.json()
    })
    .then(data => {
      return data
    })
  }

  static getShowEpisodes (showID){
    return fetch(`http://api.tvmaze.com/shows/${showID}/episodes`)
    .then(res => {
      return res.json()
    })
    .then(data => {
      return data
    })
  }
}

export default Adapter
