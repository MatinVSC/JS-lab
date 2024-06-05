let $ = document
let btn1 = $.querySelector('.btn1')
btn1.textContent = '>>' 
let btn2 = $.querySelector('.btn2')
btn2.textContent = '>'
let btn3 = $.querySelector('.btn3')
btn3.textContent = '<'
let btn4 = $.querySelector('.btn4')
btn4.textContent = '<<'
let input = $.querySelectorAll('input')
let root = $.getElementById('root')
let section = $.getElementById('section')
let secChildren = section.children
let rootChildren = root.children
let DIVS = $.querySelectorAll('#root > div')
console.log(DIVS);

let isSecChild = true


if (secChildren[0] === undefined) {
  
    for (const item of rootChildren) {
        
        btn4.addEventListener('click', function(){
            section.append(item)
            isSecChild = true
        })
       
        if (isSecChild = true) {
            btn1.addEventListener('click', function(){
            root.append(item)
            isSecChild = false
        })
        }
        
    }
}

for (const checkList of DIVS) {
    
    checkList.addEventListener('change', function(event){

        let checkBox = event.target
        
        if (checkBox.checked) {
            
            btn3.addEventListener('click', function(){
                section.append(checkList)
                checkBox.checked = ''
            })

        } if (checkBox.checked) {

            btn2.addEventListener('click', function(){
                root.append(checkList)
                checkBox.checked = ''
            })
        }
    })
}














