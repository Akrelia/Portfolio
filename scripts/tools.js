async function getJSON(path) {
  return fetch(path)
    .then((response) => response.json())
    .then((responseJson) => {
      return responseJson;
    });
}

function getByID(jsonObject, id) {
  return jsonObject.filter(function (jsonObject) {
    return jsonObject["id"] == id;
  })[0];
}