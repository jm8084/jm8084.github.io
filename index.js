

function showPage(page) {
    document.querySelectorAll('.page-wrapper').forEach(div => {
        div.style.display = 'none';
    });

    document.querySelector(`#${page}`).style.display = 'block';

}

document.addEventListener('DOMContentLoaded', () => {
    document.querySelectorAll('button').forEach(button => {
        button.onclick = () => {
            showPage(button.dataset.page);
        }
    })
});