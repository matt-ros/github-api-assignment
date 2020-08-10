function displayList(listHTML) {
    $('.js-repo-list').html(listHTML);
}

function createList(responseJson) {
    let listHTML = `<h3>Repos for ${responseJson[0].owner.login}</h3>`;
    for (let i=0; i < responseJson.length; i++) {
        listHTML += `<li><a href="${responseJson[i].html_url}">${responseJson[i].name}</li>`;
    }
    displayList(listHTML);
}

function getRepos(username) {
    fetch(`https://api.github.com/users/${username}/repos`)
    .then(response => {
        if (response.ok) {
            return response.json();
        }
        throw new Error(response.statusText);
    })
    .then(responseJson => createList(responseJson))
    .catch(error => alert(`Something went wrong: ${error}`));
}

function watchForm() {
    $('form').submit(event => {
        event.preventDefault();
        const username = $('#username-input').val();
        $('#username-input').val('');
        getRepos(username);
    });
}

$(watchForm);