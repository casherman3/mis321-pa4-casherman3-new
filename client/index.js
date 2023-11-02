let myExercises = []
let hidden = true
const url = 'https://localhost:7097/api/Exercises'

// myExercises.push({ExerciseID: getUUID(), Exercise: 'Biking', Distance: '20 mi.', Date: '2023-08-15', Deleted: false, Pinned: false})
// myExercises.push({ExerciseID: getUUID(), Exercise: 'Swimming', Distance: '2 mi.', Date: '2023-08-20', Deleted: false, Pinned: false})
// localStorage.setItem('myExercises', JSON.stringify(myExercises)) 

async function handleOnLoad()
{
    // myExercises = JSON.parse(localStorage.getItem('myExercises'))
    // if(!myExercises){myExercises = []} 

    let response = await fetch(url)
    let data = await response.json()
    console.log(data)

    let html = `
    <div class="title">
        <h1>TideFit</h1>
    </div>
    <nav class="navbar">
        <ul>
            <li><a href=""></a>Home</li>
            <li><a href=""></a>About</li>
            <li><a href=""></a>Contact</li>
        </ul>
    </nav>
    <br><br>

    <div id="tableBody"></div>
    
    <div class="add">
        <button class="button" onclick="hideForm()">+</button>
    </div>`

    myExercises.sort(function(a, b) 
    {
        return new Date(b.Date) - new Date(a.Date)
    })

    document.getElementById('app').innerHTML = html
    populateTable();
}

function hideForm()
{
    if(hidden == true)
    {
        document.getElementById('form').style.visibility = "visible"
        hidden = false
    }else if(hidden == false)
    {
        document.getElementById('form').style.visibility = "hidden"
        hidden = true
    }
}

function populateTable()
{
    let html = `
        <table class="table">
        <tr>
            <th>Exercise</th>
            <th>Distance</th>
            <th>Date</th>
            <th>Pin</th>
            <th>Delete</th>
        </tr>`

        myExercises.forEach(function(exercise)
        {
            if(exercise.Deleted === false)
            {
                const pinText = exercise.Pinned ? 'Pinned' : 'Pin'
                html +=`
                <tr class="workoutRow">
                <td>${exercise.Exercise}</td>
                <td>${exercise.Distance}</td>
                <td>${exercise.Date}</td>
                <td><button class="button" id="pin-btn-${exercise.ExerciseID}" onclick="handlePin('${exercise.ExerciseID}')">${pinText}</button></td>
                <td><button class="button" onclick="handleBookDelete('${exercise.ExerciseID}')">Delete</button></td>
                </tr>`
            }
        })
        html +=`<table>`
    document.getElementById('tableBody').innerHTML = html
}

function handleExerciseAdd()
{
    let exercise = {ExerciseID: getUUID(), Exercise: document.getElementById('exercise').value, Distance: document.getElementById('distance').value, Date: document.getElementById('date').value, Deleted: false, Pinned: false}
    myExercises.push(exercise)
    localStorage.setItem('myExercises', JSON.stringify(myExercises))
    handleOnLoad()
    document.getElementById('exercise').value = ''
    document.getElementById('distance').value = ''
    document.getElementById('date').value = ''
}

function handleBookDelete(ExerciseID)
{
    myExercises = myExercises.filter(exercise => exercise.ExerciseID != ExerciseID)
    localStorage.setItem('myExercises', JSON.stringify(myExercises))
    handleOnLoad()
}

function handlePin(ExerciseID)
{
    let pinnedExerciseId = "pin-btn-" + ExerciseID
    let pinnedButton = document.getElementById(pinnedExerciseId)

    myExercises.forEach((exercise) => {
        if(exercise.ExerciseID == ExerciseID)
        {
            exercise.Pinned = !exercise.Pinned
            if(exercise.Pinned)
            {
                pinnedButton.innerText = 'Pinned'
            } 
            else 
            {
                pinnedButton.innerText = "Pin"
            }
        }
    })
    localStorage.setItem('myExercises', JSON.stringify(myExercises))
    handleOnLoad()
}

function getUUID()
{
    return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'
    .replace(/[xy]/g, function (c) 
    {
        const r = Math.random() * 16 | 0, 
            v = c == 'x' ? r : (r & 0x3 | 0x8)
        return v.toString(16)
    })
}

async function saveExercise()
{
    let exercise = {}
    await fetch(url, 
    {
        method: "POST",
        body: JSON.stringify(exercise),
        headers:
        {
            "Content-type": "application/json; charset=UTF-8"
        }
    }) 
}

async function deleteExercise()
{
    await fetch(url + '/1', 
    {
        method: "DELETE",
        headers:
        {
            "Content-type": "application/json; charset=UTF-8"
        }
    }) 
}