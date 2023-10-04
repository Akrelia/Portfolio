let projectTitle = document.getElementById("project-title");
let description = document.getElementById("description");
let languages = document.getElementById("languages");
let timeSpend = document.getElementById("time-spend");
let roles = document.getElementById("roles");
let technos = document.getElementById("technos");
let preview = document.getElementById("preview");
let projectGallery = document.getElementById("project-gallery");
let projects;

async function loadProjects() {
  projects = await getJSON("./json/projects.json");
}

function displayProject(id) {
  var project = getByID(projects,id);

  projectTitle.innerHTML = project.title;
  description.innerHTML = project.description;
  languages.innerHTML = project.languages;
  technos.innerHTML = project.technos;
  timeSpend.innerHTML = project.time;
  roles.innerHTML = project.roles;
  preview.src = project.preview;

  projectGallery.innerHTML = "";

  for (var i = 0; i < project.videos.length; i++) {
    projectGallery.innerHTML += `<iframe class="videothumbnail" src="${project.videos[i]}" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowfullscreen></iframe>`;
  }

  for (var i = 0; i < project.gallery.length; i++) {
    projectGallery.innerHTML += `<a href="${project.gallery[i]}" target="_blank" rel="noreferrer noopener"><img class="thumbnail" src="${project.gallery[i]}" /></a>`;
  }
}
