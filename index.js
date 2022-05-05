

/**
 * Display div(page) elements based on which nav button is selected.
 **/
function showPage(page, button) {
    // hide all pages from view & show selected page
    document.querySelectorAll('.page-wrapper').forEach(div => {
        div.style.display = 'none';
    });
    document.querySelector(`#${page}`).style.display = 'block';

    // set prev-selected page nav-link css back to default
    const prev = local.getItem('page');
    if( prev != 'homePage') {
        document.querySelectorAll('.nav-link').forEach( btn => {
            if(btn.dataset.page === prev){
                btn.style = '.nav-link'
            }
       });
    }

    // set selected page nav-link css to appear selected
    if( page !== 'homePage') {
        button.style.borderBottom = "solid 2px white";
        button.style.borderRadius = "10%";
        button.style.paddingTop = "10%";
        button.style.backgroundColor = cHeader;
    }

    // set local current page
    local.setItem('page', page);
}

/**
 * Moves element right 1px until end of doc; then resets from left
 * @param {element passed to flow for animation} elem 
 */
function flow(elem) {
    const maxWidth = elem.parentElement.clientWidth;
    var pos = elem.offsetLeft;
    const id = setInterval(()=>{ 
        // opposite flow process for 'midRow' txt class 
        if(elem.parentElement.className.includes('midRow')){
            // check end border reached to reset else move on
            if(pos == -(elem.clientWidth)){
                pos = maxWidth;
                elem.style.left = maxWidth;
                elem.style.marginTop = Math.floor(Math.random() * 15) + '%';
            } else {
                pos--;
                elem.style.left = pos + 'px';
            }
        } else {
            // check end border reached to reset else move on
            if(pos == maxWidth){
                pos = -(elem.clientWidth);
                elem.style.left = -(elem.clientWidth) + 'px';
                elem.style.marginTop = Math.floor(Math.random() * 10) + '%';
            } else {
                pos++;
                elem.style.left = pos + 'px';
            }
    }
    }, 1);
    
}

// init
const local = window.localStorage;
const cHeader = "rgb(44, 52, 95)";
local.setItem('page', 'homePage');

document.addEventListener('DOMContentLoaded', () => {
    document.querySelectorAll('button').forEach(button => {
        button.onclick = () => {
            showPage(button.dataset.page, button);
        }
    });

    document.querySelectorAll('.txt').forEach(elem => {
        flow(elem);
    })
});

