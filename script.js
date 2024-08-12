const usn=document.querySelector('#usn-input');
const branch=document.querySelector('#branch-input');
const username=document.querySelector('#name-input');
const CGPA=document.querySelector('#cgpa-input');
const year=document.querySelector('#year-input');
const uploadButton=document.querySelector('#submit-upload-button');
const searchUsn=document.querySelector('#search-box');
const searchButton=document.querySelector('#submit-search-button');
const tableBody=document.querySelector('#table-body-container');
const apiURL='https://crudcrud.com/api/70258a5c3eef46f3ac7f2ce2ea5ce074/students'

uploadButton.addEventListener('click',async (e)=>{
    e.preventDefault();
    try{
        await fetch(apiURL, {
            method: 'POST',
            headers:{
                'Content-Type':'application/json'
            },
            body: JSON.stringify({
                usnData: usn.value,
                branchData: branch.value,
                nameData: username.value,
                cgpaData: CGPA.value,
                yearData: year.value
            })
        })
    } catch(error){console.alert(error);}
    
})

searchButton.addEventListener('click',async (e)=>{
    e.preventDefault();
    try{
        let check=0;
        const res=await axios.get(apiURL);
        res.data.forEach(element => {
            if(element.usnData===searchUsn.value){
                buildTable(element);
                check=1;
                return;
            }
        }
    )
    if(check==0){alert('Not Found');}

} catch(error){
    console.log(error);
}
})

function buildTable(data){
    const row=`<tr>
                    <td>${data.usnData}</td>
                    <td>${data.branchData}</td>
                    <td>${data.nameData}</td>
                    <td>${data.cgpaData}</td>
                    <td>${data.yearData}</td>
                    <td>
                        <button id='delete-button' data-id=${data._id}>Delete</button>
                        <button id='edit-button' data-id=${data._id}>Edit</button>
                    </td>
                </tr>`
    tableBody.innerHTML=row;
    const deleteButton=document.querySelector('#delete-button');
    const editButton=document.querySelector('#edit-button');
    deleteButton.addEventListener('click',handleDelete);
    editButton.addEventListener('click',async (e)=>{
        usn.value=data.usnData;
        branch.value=data.branchData;
        username.value=data.nameData;
        CGPA.value=data.cgpaData;
        year.value=data.yearData;
        const id=e.target.getAttribute('data-id');
        try{
            await axios.put(`${apiURL}/${id}`,{
                headers:{
                    'Content-Type':'application/json',
                },
                body:{
                    usnData: usn.value,
                    branchData: branch.value,
                    nameData: username.value,
                    cgpaData: CGPA.value,
                    yearData: year.value
                }
            })
        } catch(error){alert(error);}
    });
}

async function handleDelete(e){
    try{
        const id=e.target.getAttribute('data-id');
        await fetch(`${apiURL}/${id}`,{
            method: 'DELETE'
        });
        tableBody.innerHTML='';
    } catch(error){alert(error);}
}

// async function handleEdit(e){
//     try{
//         usn.value=usnData;
//         branch.value=branchData;
//         username.value=nameData;
//         CGPA.value=cgpaData;
//         year.value=yearData;
//         const id=e.target.getAttribute('data-index');
//         await axios.put(`${apiURL}/${id}`,{
//             headers:{
//                 'Content-Type': 'application/json'
//             },
//             body:{
//                 usnData: usn.value,
//                 branchData: branch.value,
//                 nameData: username.value,
//                 cgpaData: CGPA.value,
//                 yearData: year.value
//             }
//         })
//     } catch(error){alert(error);}
// }
