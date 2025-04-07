const API_URL = "http://localhost:3000/albums";

async function fetchAlbums() {
    const response = await fetch(API_URL);
    const data = await response.json();
    const tbody = document.querySelector("#albums tbody");

    tbody.innerHTML = ""; 
    data.forEach(row => {
        const id = row.id || "N/A";
        const band = row.band || "Unknown";
        const title = row.title || "Untitled";
        const length = row.length || "Unknown";
        const release = row.release || "Unknown";

        const tr = document.createElement("tr");
        tr.innerHTML = `
            <td>${id}</td>
            <td>${band}</td>
            <td>${title}</td>
            <td>${length}</td>
            <td>${release}</td>
            <td>
                <a onclick="viewAlbum(${id})"><img src="search.png" alt="View"></a>
                <a onclick="updateAlbum(${id})"><img src="reload.png" alt="Update"></a>
                <a onclick="deleteAlbum(${id})"><img src="trash.png" alt="Delete"></a>

            </td>
        `;
        tbody.appendChild(tr);
    });
}

async function viewAlbum(id) {
    const response = await fetch(`${API_URL}/${id}`);
    const data = await response.json();
    document.querySelector("#viewAlbum").innerHTML = `
        <h2>${data.title} - ${data.band}</h2>
        <p><strong>Length:</strong> ${data.length} minutes</p>
        <p><strong>Release Year:</strong> ${data.release}</p>
    `;
}

async function updateAlbum(id) {
    const band = prompt("Enter the band name:");
    const title = prompt("Enter the album title:");
    const length = prompt("Enter the album length (minutes):");
    const release = prompt("Enter the release year:");

    if (band && title && length && release) {
        await fetch(`${API_URL}/${id}`, {
            method: "PUT",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ band, title, length, release })
        });
        fetchAlbums();
    }
}

async function deleteAlbum(id) {
    await fetch(`${API_URL}/${id}`, { method: "DELETE" });
    fetchAlbums();
}

document.querySelector("#addAlbumForm").addEventListener("submit", async (e) => {
    e.preventDefault();
    const band = document.querySelector("#band").value;
    const title = document.querySelector("#title").value;
    const length = document.querySelector("#length").value;
    const release = document.querySelector("#release").value;

    await fetch(API_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ band, title, length, release })
    });

    fetchAlbums();
});

document.addEventListener("DOMContentLoaded", () => {
    fetchAlbums();
});
