// Create Element
function addElement(obj, str1, str2) {
    let elem = document.createElement(str1);
    let para = document.createElement('p');
    if (str1 === 'img') 
    {
        elem.src = str2;
        result = obj.appendChild(elem);
        return result;
    } else if (str1 === 'p')
    {
        elem.innerText = str2;
        result = obj.append(elem);
        return result;
    } 
    else if (str1 === 'div')
    {
        para.innerText = str2;
        elem.className = "bp";
        elem.append(para);
        result = obj.append(elem);
    }
};

function loading(obj, pic_str, para_str, j) {
    let elem = document.createElement('div');
    let elem_2 = document.createElement('div');
    let pic = document.createElement('img'); 
    let para = document.createElement('p');
    elem.className = 'b1';
    elem_2.className = 'bp';
    pic.src = pic_str; 
    para.innerText = para_str; 
    elem.appendChild(pic);
    elem_2.append(para);
    elem.appendChild(elem_2);
    obj.style.display = 'grid';
    result = obj.appendChild(elem);
    if (j==23|j==24|j==25|j==30|j==31|j==32|j==54|j==56|j==57)
    {
        elem_2.id = 'second-row';
    }
    return result;    
}

// AJAX網路連線並取得資料
fetch("https://padax.github.io/taipei-day-trip-resources/taipei-attractions-assignment.json").then(function(response){
    return response.json();
}).then(function(data){
    // data processing
    let d = data.result.results;
    let pic = [];
    let title = [];
    for (let i = 0; i < d.length; i++)
    {
        pic.push(d[i].file.toLowerCase().split("jpg")[0]+"jpg");
        title.push(d[i].stitle);
    }
    // create element(Top)
    let t1 = document.querySelectorAll(".t1");
    for (let i = 0; i < 2; i++)
    {
        addElement(t1[i], 'img', pic[i]);
        addElement(t1[i], 'p', title[i]);
    }
    // create element(Bottom)
    let b1 = document.querySelectorAll(".b1");
    for (let j = 0; j < 8; j++)
    {
        addElement(b1[j], 'img', pic[j+2]);
        addElement(b1[j], 'div', title[j+2]);
    }
    let bp = document.querySelectorAll(".bp");
    for (let j = 4; j < 8; j++)
    {
        bp[j].id = "second-row"; 
    }

    let loadMore = document.querySelectorAll("#LoadMore");
    let backTop = document.querySelectorAll("#BackTop");
    let L1 = document.querySelector("#L1");
    let startPage = 10; let increasePage = startPage + 8; const endPage = d.length + 8;
    loadMore[0].addEventListener('click', () => {
        for (let j = startPage; j < increasePage; j++)
        {
            if (increasePage < endPage && j <= 49) 
            {
                result = loading(L1, pic[j], title[j], j);
            } else if (j > 49) {
                result = loading(L1, pic[j], title[j], j);
                loadMore[0].style.display = 'none'; backTop[0].style.display = 'block';
                backTop[0].addEventListener('click', () => {
                    while(L1.firstChild)
                    {
                        L1.removeChild(L1.lastChild);
                    }   
                    backTop[0].style.display = 'none'; 
                    loadMore[0].style.display = 'block';
                    startPage = 10; increasePage = startPage + 8; 
                });
            }
        }   
        startPage += 8;
        increasePage += 8;
    })
});
