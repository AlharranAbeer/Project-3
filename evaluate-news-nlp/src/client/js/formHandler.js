function handleSubmit(event) {
    event.preventDefault()

    // check what text was put into the form field
    let formText = document.getElementById('name').value
    Client.checkForName(formText)

    console.log("::: Form Submitted :::")
    fetch('http://localhost:8081/analysis')
    .then(res => res.json())
    .then(function(res) {
        document.getElementById('score').innerHTML = res.score_tag;
        document.getElementById('agree').innerHTML = res.agreement;
        document.getElementById('subject').innerHTML = res.subjectivity;
        document.getElementById('confid').innerHTML = res.confidence;
        document.getElementById('irony').innerHTML = res.irony;

    })
}

export { handleSubmit }
