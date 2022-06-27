

/**
 * Display div(page) elements based on which nav button is selected.
 * 
 * @param {Page to be shown} page 
 * @param {acive page button} button 
 */
function showPage(page, button) {
    // hide all pages from view & show selected page
    document.querySelectorAll('.page').forEach(div => {
        div.style.display = 'none';
    });
    document.querySelector(`#${page}`).style.display = 'flex';

    // set prev-selected page nav-link css back to default
    const prev = local.getItem('page');
    if( prev != 'homePage') {
        document.querySelectorAll('.navLink').forEach( btn => {
            if(btn.dataset.page === prev){
                btn.style = '.navLink'
            }
       });
    }

    // set selected page nav-link css to appear selected
    if( page !== 'homePage') {
        button.style.borderBottom = "solid 2px white";
        button.style.borderRadius = "10%";
        button.style.paddingTop = "7vh";
        button.style.backgroundColor = cHeader;
    }

    // set local current page
    local.setItem('page', page);
}

/**
 * Moves element right 1px until end of doc; then resets from left
 * 
 * @param {element to be affected by flow animation} elem 
 */
function flow(elem) {
    const maxWidth = elem.parentElement.clientWidth;
    const maxHeight = elem.parentElement.clientHeight;
    var speed = 10;
    var offset = 0;

    // set element flowspeed & initial gap btwn 
    if(maxWidth > 999){
        speed=1;
        offset = (Math.floor(Math.random() * 4)+1)*400;

    } else if(maxWidth > 500){
        speed=5;
        offset =(Math.floor(Math.random() * 4)+1)*200;
    } else {
        offset = (Math.floor(Math.random() * 4)+1)*100;
    }

    // set initial random dist from top
    var rand = getRand(maxHeight);
    elemHeights[elem.dataset.idx] = rand;
    elem.style.top = rand+"px";

    // start element on left or right of screen
    if(elem.dataset.flow == "L"){
        elem.style.left = (maxWidth + offset) + "px";
    } else {
        elem.style.left = (-(elem.clientWidth) - offset)+"px";
    }

    // change element innerHTML & position
    const resetElem = (e)=>{
        setHTML(e);
        rand = getRand(maxHeight);
        elemHeights[e.dataset.idx] = rand;
        e.style.top = rand+"px";
    }

    var pos = elem.offsetLeft;
    setHTML(elem);

    // move element accross screen from homePage
    const id = setInterval(()=>{ 
        if(local.getItem('page') === 'homePage'){
            if(elem.dataset.flow == "L"){
                if(pos == -(elem.clientWidth)){
                    pos = maxWidth;
                    elem.style.left = maxWidth +"px";
                    resetElem(elem);
                } else {
                    pos--;
                    elem.style.left = pos + 'px';
                }
            } else {
                if(pos == maxWidth){
                    pos = -(elem.clientWidth);
                    elem.style.left = -(elem.clientWidth) + 'px';
                    resetElem(elem);
                } else {
                    pos++;
                    elem.style.left = pos + 'px';
                }
            }     
        }
    }, speed);
}

// set innerHTML
function setHTML(elem){
    const maxRand = techs.length;

    const avail = techs.map((tech) => {
        if(!(elemTxt.includes(tech))){
            return tech;
        }
    });   

    var txtSelect = (arr)=>{
        // random 0 - maxRand
        var x = Math.floor(Math.random() * maxRand);
        if(arr[x] == undefined){
            return txtSelect(arr);
        } else {return arr[x];}
    }

    const txt = txtSelect(avail);
    elem.innerHTML = txt;
    elemTxt[elem.dataset.idx] = txt;

}

/**
 * Generates a random number thats at least 'padding' pixels away
 * from preveious numbers (elemHeights) and greater than 50.
 * 
 * @param {max distance (in pixels) from top of screen} max
 * @returns Random number meeting all constraints
 */
function getRand(max){
    const padding = 25;
    var rand = 0;
    var valid = false;

    while(!valid){
        valid = true;
        // random 0 - (max-65)
        rand = Math.floor(Math.random() * (max-65));

        elemHeights.forEach((x)=>{
            if((Math.abs(x - rand)<=padding) || (rand < 65) ) {
                valid = false;     
            }
        });   
    }
    return rand;
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

/**********-------------------- END FUNCTIONS --------------------***********/

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
];

const techs = [
    "CSS", "DJango", "Material-UI","PostgreSQL", "AWS",
    "git", "Python", "Javascript", "Java","Bootstrap",
    "React.js", "HTML", "MongoDB"
];
const elemHeights = [];
const elemTxt = [];


// init
const local = window.localStorage;
const cHeader = "rgb(44, 52, 95)";
local.setItem('page', 'homePage');  //pages: homePage, aboutPage, projectsPage

// Content loaded events
document.addEventListener('DOMContentLoaded', () => {
    document.querySelectorAll('.toPage').forEach(button => {
        button.onclick = () => {
            showPage(button.dataset.page, button);
        }
    });

    document.querySelectorAll('.txt').forEach(elem => {
        elemTxt.push(" ")
        flow(elem);
    });
});

document.addEventListener('click', () => {
    document.querySelectorAll('.aboutTopic').forEach(topic => {
        aboutInfo(topic.dataset.topic);
    });
});

