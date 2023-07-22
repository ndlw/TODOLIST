
const input = document.getElementById('input')
const button = document.getElementById('button')
const list = document.getElementById('list')
const announce = document.getElementById('announce')
var noteList = null ? [] : JSON.parse(localStorage.getItem('noteList'))
// render khi mở trang và reload lại trang
render()

//khai báo giá trị cho ID của object
var idObject
for (let noteItem of noteList) {
    idObject = noteItem.id + 1
}

if (idObject == null || idObject === undefined) {
    idObject = 1;
}

// sự kiện click button
button.addEventListener('click', (e) => {
    if (button.innerText == 'CREAT TASK') {
        e.preventDefault()
        // ngăn việc user ko nhập ghi chú
        if (input.value == "") {
            confirm('bạn chưa nhập ghi chú')
        } else {
            let note = {
                id: idObject,
                note: `${input.value}`,
                color: "",
                textDecoration: "",
                complete: false
            }
            idObject++
            noteList.unshift(note)
            save()
            render()
        }
    }

})
//HÀM SAVE DATA VÀO LOCALSTORAGE
function save() {
    localStorage.setItem('noteList', JSON.stringify(noteList))

}

//HÀM RENDER
function render() {
    button.innerText = 'CREAT TASK'

    input.value = ""
    var renderHTML = noteList.map((noteItem, index) => {

        return `<li class="list-item isComplete" id="list-item-${noteItem.id}">
                <p class="main-work" id="main-work-${noteItem.id}" onclick = "doneNote('${index}')" style="text-decoration: ${noteItem.textDecoration}; color: ${noteItem.color};"> ${noteItem.note}</p>
                <i class="fa-solid fa-pen-to-square" onclick = "editNote('${index}')"></i>
               <i class="fa-solid fa-trash" onclick = "removeNote('${index}')"></i>
            </li>
            <hr>`
    })

    list.innerHTML = renderHTML.join('')
    counter()

}

//HÀM REMOVE
function removeNote(index) {
    noteList.splice(index, 1)
    save()
    render()
    // console.log(noteList)
}

//HÀM EDIT
function editNote(index) {
    button.innerText = 'EDIT TASK';
    input.value = noteList[index].note;
    console.log(index);
    button.onclick = (e) => {
        if (button.innerText == 'EDIT TASK') {
            e.preventDefault();
            noteList[index].note = input.value;
            console.log(index);
            save();
            render();
        }
    }
}





//HÀM THỂ HIỆN CÔNG VIỆC HOÀN THÀNH

function doneNote(index) {

    if (noteList[index].textDecoration == "line-through") {
        noteList[index].textDecoration = "inherit"
        noteList[index].color = "#fff";
        noteList[index].complete = false
    } else {
        noteList[index].textDecoration = "line-through";
        noteList[index].color = "grey";
        noteList[index].complete = true
    }
    // announce.innerText = `Yeah, ${numComplete} task completed`
    save()
    render()
}

// HÀM ĐẾM SỐ CÔNG VIỆC HOÀN THÀNH
function counter() {
    var numComplete = 0
    if (Array.isArray(noteList) && noteList.length === 0) {
        announce.innerText = 'You do not have any task'
    }
    
    noteList.map((noteItem, index) => {
        if (noteItem.complete) {
            numComplete++
        }
        console.log(numComplete)
        localStorage.setItem('numComplete', numComplete)
        announce.innerText = `${localStorage.getItem('numComplete')} / ${index + 1} task completed !`
    })

}