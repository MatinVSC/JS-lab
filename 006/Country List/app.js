const countries = [
    {
        category : "A",
        title: ['Australia' , 'Argentina'],   
    },
    {
        category : "B",
        title: ['Brazil']    
    },
    {
        category : "C",
        title: ['China']
    },
    {
        category : "D",
        title: []
    },
    {
        category : "E",
        title: ['England']
    },
    {
        category : "F",
        title: ['Finland']
    },
    {
        category : "G",
        title: ['Germany' , ' Georgia']
    },
    {
        category : "H",
        title: []
    },
    {
        category : "I",
        title: ['Iran' , 'Iyaly']
    },
    {
        category : "J",
        title: []
    },
    {
        category : "K",
        title: []
    },
    {
        category : "L",
        title: []
    },
    {
        category : "M",
        title: []
    },
    {
        category : "N",
        title: ['Norway']
    },
    {
        category : "U",
        title: ['Usa' ,  'Uae']
    },
    {
        category : "P",
        title: []
    },
    {
        category : "Q",
        title: []
    },
    {
        category : "R",
        title: []
    },
    {
        category : "S",
        title: []
    },
    {
        category : "T",
        title: []
    },
    {
        category : "O",
        title: []
    },
    {
        category : "V",
        title: []
    },
    {
        category : "W",
        title: []
    },
    {
        category : "X",
        title: []
    },
    {
        category : "Y",
        title: []
    },
    {
        category : "Z",
        title: []
    },
    ];
    
    // dom nodes
    const root = document.getElementById("root")
    const input = document.getElementById("input")
    const inputAdd = document.getElementById("inputAdd")
    const searchList = document.getElementById('search-list');
    
    // functions
    function render(list) {
        // list = list.map(country => country.toUpperCase()).sort()
        root.innerHTML = "";
        for (const item of list) {
            const li = document.createElement("li");
            if ( item.title.length != 0 ) {
                li.textContent = `${item.category} : ${item.title}`;
                root.appendChild(li)
            }
        }
    }
    
    function handleSearch() {
        searchList.innerHTML = '';
        root.innerHTML = '';
        if ( input.value != '') {
            let value = String(input.value);
            let value2 = value.slice(1);
            let firstLetter = value[0].toUpperCase();
            let UpperCaseValue = `${firstLetter}${value2}`;
            
            let filterList = countries.filter( function (country) {
                if ( country.category.startsWith(firstLetter)) {
                    return country
                }
            })
            filterList = filterList[0].title
    
            
    
            if ( filterList.length != 0 ) {
                filterList.forEach ( function (item) {
    
                    if ( item.startsWith(UpperCaseValue) ) {
    
                        let template = `<li>${item}</li>`;
                        searchList.innerHTML += template;
                    }
                })
    
            }
            
        } else {
            render(countries)
        }
    }
    
    function handleAdd() {
        
        let valueCat = String(inputAdd.value)
        let valueCat2 = valueCat.slice(1);
        let firstLetter = valueCat[0].toUpperCase()
        let UpperCaseValue = `${firstLetter}${valueCat2}`;
    
        countries.forEach( function (country) {
    
            if ( country.category.startsWith(firstLetter) ) {
                
                let existence = country.title.every ( function (item) {
    
                    if ( item != UpperCaseValue ) {
                        return true
                    }
                })
                if ( existence ) {
                    country.title.push(UpperCaseValue)
                } 
            }
        })
    
        render(countries);
        inputAdd.value = ""
    }
    
    function handleEnter() {
        if(event.code === "Enter")
            handleAdd();
    }
    
    // events
    render(countries)