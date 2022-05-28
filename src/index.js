

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
 * @param {element to be affected by flow animation} elem 
 */
function flow(elem) {
    const maxWidth = elem.parentElement.clientWidth;
    var pos = elem.offsetLeft;
    const id = setInterval(()=>{ 
        if(local.getItem('page') === 'homePage'){
        // opposite flow process for 'midRow' txt class 
         if (elem.parentElement.className.includes('midRow')){
            // check end border reached to reset else move on
            if(pos == -(elem.clientWidth)){
                pos = maxWidth;
                elem.style.left = maxWidth;
                elem.style.marginTop = Math.floor(Math.random() * 45) + 3 + '%';
            } else {
                pos--;
                elem.style.left = pos + 'px';
            }
        } else {
            // check end border reached to reset else move on
            if(pos == maxWidth){
                pos = -(elem.clientWidth);
                elem.style.left = -(elem.clientWidth) + 'px';
                elem.style.marginTop = Math.floor(Math.random() * 45) + 3 + '%';
            } else {
                pos++;
                elem.style.left = pos + 'px';
            }
        }
        
    }}, 1);  
}

/**
 * 
 * @param {topic name(key) to get data to be displayed on the about page} topic 
 */
function aboutInfo(topic) {
    topics.forEach(arr => {
        if(arr.name == topic){
            //update inner html
            console.log(arr.description);
        } else {
            console.log('data not found!');
        }
    });
}

// page data for aboutPage topics
const topics = [
    {
        "name":"dog",
        "description": "Love my DOGO!"
    },
    {
        "name":"car",
        "description": "Love my WHIP!"
    },
    {
        "name":"stock",
        "description": "Love my STONKS!"
    }
]

// init
const local = window.localStorage;
const cHeader = "rgb(44, 52, 95)";
local.setItem('page', 'homePage');  //pages: homePage, aboutPage, projectsPage

document.addEventListener('DOMContentLoaded', () => {
    document.querySelectorAll('button').forEach(button => {
        button.onclick = () => {
            showPage(button.dataset.page, button);
        }
    });

    document.querySelectorAll('.txt').forEach(elem => {
        flow(elem);
    });
});

document.addEventListener('click', () => {
    document.querySelectorAll('.aboutTopic').forEach(topic => {
        aboutInfo(topic.dataset.topic);
    });
});

