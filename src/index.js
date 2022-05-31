

/**
 * Display div(page) elements based on which nav button is selected.
 * 
 * @param {Page to be shown} page 
 * @param {acive page button} button 
 */
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
 * 
 * @param {element to be affected by flow animation} elem 
 */
function flow(elem) {
    const maxWidth = elem.parentElement.clientWidth;
    const maxHeight = elem.parentElement.clientHeight;

    var rand = getRand(maxHeight);
    elemHeights[elem.dataset.idx] = rand;
    elem.style.top = rand+"px";

    // start element on left or right of screen
    if(elem.dataset.flow == "L"){
        elem.style.left = maxWidth + "px";
    } else {
        elem.style.left = -(elem.clientWidth)+"px";
    }

    var pos = elem.offsetLeft;

    const resetElem = (e)=>{
        setHTML(e);
        rand = getRand(maxHeight);
        elemHeights[e.dataset.idx] = rand;
        e.style.top = rand+"px";
    }

    setHTML(elem);

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
    }, 20);  
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
    const padding = 65;
    var rand = 0;
    var valid = false;

    while(!valid){
        valid = true;
        rand = Math.floor(Math.random() * (max-65));

        elemHeights.forEach((x)=>{
            if((Math.abs(x - rand)<=padding) || (rand < 50) ) {
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
    "CSS", "DJango", "Material-UI","Postgres", "AWS",
    "git", "Python", "Javascript", "Java","Bootstrap",
    "React.js", "HTML", "MongoDB"
];
const elemHeights = [];
const elemTxt = [" ", " ", " ", " ", " "];


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
        setTimeout(flow(elem), Math.floor(Math.random() * 500)+50);
    });
});

document.addEventListener('click', () => {
    document.querySelectorAll('.aboutTopic').forEach(topic => {
        aboutInfo(topic.dataset.topic);
    });
});

