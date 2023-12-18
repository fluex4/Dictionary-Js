
Search=()=>{
    document.getElementById("content").innerHTML="";
    let val = document.getElementById("search").value;
    val=val.trim();
    if( val=="")
     val="Dictionary";
    let url=`https://api.dictionaryapi.dev/api/v2/entries/en/${val}`;

    fetch(url)
        .then((response)=>{
            return response.json();
        }).then(data=>{
            // console.log(data);
            if(data.title){
                document.getElementById("word").innerText="Sorry! No Such Word Found. >_<";
            }
                
            else{
                document.getElementById("word").innerText=data[0].word;
                document.getElementById("ptc").innerText=data[0].phonetic;
            data[0].meanings.forEach(element => {
                // console.log(element);
                let meaning = document.createElement("div");
                meaning.classList.add("meaning");
                let pos = document.createElement("h3");
                pos.innerText=element.partOfSpeech;
                meaning.appendChild(pos);
                let ul = document.createElement("ul");
                ul.classList.add("list");
                element.definitions.forEach(def=>{
                    let li = document.createElement("li");
                    li.innerText=def.definition;
                    ul.appendChild(li);
                })
                meaning.appendChild(ul);

                let str="Synonyms: ";
                let syn = document.createElement("p");
                element.synonyms.forEach(d=>{
                    str=str+d+",";
                })
                syn.innerText=str;
                 str="Antonyms: ";
                let ant = document.createElement("p");
                element.antonyms.forEach(d=>{
                    str=str+d+",";
                })
                ant.innerText=str;
                meaning.appendChild(syn);
                meaning.appendChild(ant);


                document.getElementById("content").appendChild(meaning);
                let hr =document.createElement("hr");
                document.getElementById("content").appendChild(hr);
            });}
        })
}
