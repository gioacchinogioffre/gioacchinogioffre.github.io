export const getApiGenres = async () => {
    const apiUrl = await axios.get('https://api.rawg.io/api/genres?key=2af3f6c5a1664ede9a13c4814da20f16');
    const apiGenres = await apiUrl.data.results.map(g => {
        return {
            name: g.name,
            id: g.id,
            image_background: g.image_background
        }
    })
    return apiGenres;
}