// loading the buttons from the api
const createElement = (arr)=>{
    const htmlElement = arr.map((el)=>`<span class="btn">${el}</span>`)
return htmlElement.join(" ")}

const mangeSpinner = (status)=>{
    if(status == true){
        document.getElementById("spinner").classList.remove("hidden")
        document.getElementById("wordsDiv").classList.add("hidden")
    }
    else{
         document.getElementById("wordsDiv").classList.remove("hidden")
        document.getElementById("spinner").classList.add("hidden")
    }
}

const lessons = ()=>{
    fetch("https://openapi.programming-hero.com/api/levels/all")
    .then(res => res.json())
    .then(json => displayLesson(json.data))
}

const removeActive = ()=> {
    const lessonButtons = document.querySelectorAll(".lesson-btn")
    lessonButtons.forEach(btn => {
        btn.classList.remove("active")
    })
}
// loading words from the api 
const loadLevelWord =(id)=>{
    mangeSpinner(true);
    const url = `https://openapi.programming-hero.com/api/level/${id}`
    fetch(url)
    .then(res => res.json())
    .then(data => {
        removeActive();
        const clickBtn = document.getElementById(`lesson-btn-${id}`)
        clickBtn.classList.add("active")
        loadWords(data.data)
    })
}
// lesson button
const displayLesson = (data)=> {
    const lessonsDiv = document.getElementById('lessonDiv')
    lessonsDiv.innerHTML = "";

    for( const lesson of data){
        const div = document.createElement("div")
        div.innerHTML = `
        
            <button id = "lesson-btn-${lesson.level_no}" onclick=loadLevelWord(${lesson.level_no}) class="btn btn-outline btn-primary lesson-btn"><i class="fa-solid fa-book-open"></i>Lesson-
             ${lesson.level_no}
             </button>
        `
        lessonsDiv.appendChild(div)
    }
}
// load Word Details 
const loadWordDetail=async(id)=>{
    const url = `https://openapi.programming-hero.com/api/word/${id}`
    const res = await fetch(url);
    const details = await res.json();
    displayWordDetails(details.data);
}
const displayWordDetails = (words)=>{
    console.log(words);
    const detailsBox = document.getElementById("detail-container");
    detailsBox.innerHTML =`<div class="space-y-5">
    <div>
    <p class="font-bold">Eager (<i class="fa-solid fa-microphone"></i>   :${words.word})</p>
  </div>
  <div>
    <p class="font-bold">Meaning</p>
    <p>${words.meaning}</p>
  </div>
  <div>
    <p class="font-bold">Example</p>
    <p>${words.sentence}</p>
  </div>
  <div class="space-y-2">
    <p class="font-bold">সমার্থক শব্দ গুলো</p>
    <div>${createElement(words.synonyms)}
    </div>`;
        document.getElementById("my_modal").showModal()
}

const loadWords = (data)=>{
const wordsDiv = document.getElementById('wordsDiv')
wordsDiv.innerHTML ='';
if(data.length === 0){
        wordsDiv.innerHTML = `
        <div class="text-center col-span-full space-y-5">
        <img class="mx-auto" src="assets/alert-error.png" alt="">
  <p class="text-[#79716B] text-sm">আপনি এখনো কোন Lesson Select করেন নি</p>
  <p class="font-bold text-2xl">একটি Lesson Select করুন।</p>
</div>
        `
        mangeSpinner(false)
        return;
}
 data.forEach(element => {
     const div = document.createElement("div")
    div.innerHTML = `
    <div class ="bg-white shadow-md p-14 text-center space-y-3">  
    <p class ="font-bold text-2xl">${element.word ? element.word : 'no word found'}</p>
      <p>Meaning /Pronounciation</p>
      <p class ="font-semibold text-2xl">${element.meaning? element.meaning : 'no meaning found'} / ${element.pronunciation ? element.pronunciation : 'pronunciation not found'}</p>
      <div class="flex justify-between">
       <div  onclick="loadWordDetail(${element.id})" class="bg-[#c4cce7] p-2 rounded-md"> <i class="fa-solid fa-circle-info"></i></div>
       <div class="bg-[#cad1ea] p-2 rounded-md"><i class="fa-solid fa-volume-high"></i></div>  
       </div>
    `
    wordsDiv.appendChild(div);
    mangeSpinner(false)
 });
}
lessons()
