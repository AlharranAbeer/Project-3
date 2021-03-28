async function handleSubmit(event) {
    event.preventDefault()
    // check what text was put into the form field
    let formText = document.getElementById('name').value
    // check the url Validity 
    Client.checkForURL(formText)
    console.log("::: Form Submitted :::")
    const results = await postData('http://localhost:8081/add', { formText })
    UpdateUI(results);
}
// from the previous project 
const postData = async (url = "http://localhost:8081/add" , data = {})=> {
    const res = await fetch('http://localhost:8081/add' , {
        method: 'POST',
        credentials: 'same-origin',
        headers: {
            'Content-Type' : 'application/json',
        },
        body: JSON.stringify(data), // body data type must match "Content-Type" header    
    });
    try{
        const newData = await res.json();
        console.log(newData);
        return newData;
    }catch(error) {
        console.log(error)
    }
}
// from the previous project
const UpdateUI = async res => {
    try{
        // update all of the <p> elements in the DOM
        document.getElementById('score').innerHTML = res.score_tag;
        document.getElementById('agree').innerHTML = res.agreement;
        document.getElementById('subject').innerHTML = res.subjectivity;
        document.getElementById('confid').innerHTML = res.confidence;
        document.getElementById('irony').innerHTML = res.irony;      
    }catch(error) {
        console.log( error)
    }
};

// ----------------- OLD CODE ------------------
//     fetch('http://localhost:8081/analysis', {
//         method: "POST",
//         headers: {
//             "Content-Type": "application/JSON",

//         },
//         body: 
//             JSON.stringify({
//                 url: formText
//         })
//     })
//     .then(res => res.json())
//     .then(function(res) {
//         document.getElementById('score').innerHTML = res.score_tag;
//         document.getElementById('agree').innerHTML = res.agreement;
//         document.getElementById('subject').innerHTML = res.subjectivity;
//         document.getElementById('confid').innerHTML = res.confidence;
//         document.getElementById('irony').innerHTML = res.irony;

//     })
// }

export { handleSubmit }