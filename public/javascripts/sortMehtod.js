const sortList = {
    "name-asc": {name: "asc"},
    "name-desc": {name: "desc"},
    "category": {category: "asc"},
    "rating": {rating: "desc"}
}

function sortMethod(sortSelect) {
    return sortList[sortSelect]
}

module.exports = sortMethod