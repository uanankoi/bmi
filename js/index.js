
        // 宣告選取

        let howtall = document.querySelector('#howtall');
        let howweight = document.querySelector('#howweight');
        let result = document.querySelector('.result');

        // 計算筆數

        function countdetails (){
            let details = document.querySelectorAll('.detail');
            let total = document.querySelector('.total');
            total.innerText = details.length;
            console.log('details.length'+details.length);
            console.log( typeof details.length);
            // 超過數目改成overflow-y scroll
            if(details.length>2){
                result.classList.add('more')
            }else if(details.length<2){
                result.classList.remove('more')
            }
            // 數目為0加提醒文字
            if(details.length==0){
                result.innerHTML='<div class="zero">請輸入資料</div>';
            }
        }

        // cilck 計算
        
        let clickbtn = document.querySelector('.clickbtn a');
        clickbtn.addEventListener('click',function(e){

            // 取勾選值
            let gen = document.getElementsByName('gender');
            let gender,color = ''
            for(i=0;i<gen.length;i++){
                // 取有勾選的值
                if(gen[i].checked){
                    // console.log(gen[i]);
                    // console.log(gen[i].value);
                     if(gen[i].value=='male'){
                         gender='男'
                         color='blue'
                     }else if(gen[i].value=='female'){
                         gender='女'
                         color='red'
                     }
                }
            }
            
            // 取得輸入值
            let thetall = howtall.value;
            let theweight = howweight.value;
            // bmi=體重(kg)/身高(m)平方，取小術後一位
            let thebmi = (parseFloat(theweight)/Math.pow((parseFloat(thetall)/100),2)).toFixed(1);
            
            // 判斷是否輸入還有輸入值是否為數值
            if(isNaN(thetall) || isNaN(theweight) || thetall=="" || theweight=="" ){
                alert('請輸入正確數值');
                return false;
            }

            // 是否有勾選性別
            if(!gen[0].checked && !gen[1].checked){
                alert('請選擇性別');
                return false;
            }

            // bmi數值範圍判斷
            // notice 為 .part2 .down <b>
            let notice = '';
            switch (true){
                case (thebmi<18.5):
                     notice='過輕';
                     break;
                case (18.5<=thebmi && thebmi<24):
                     notice='正常';
                     break;
                case (24<=thebmi):
                     notice='過重';
                     break;
                default:
                     notice='';     
            }

            // console.log(result.firstElementChild.innerText);
            // 清除提醒
            if(result.firstElementChild.innerText=='請輸入資料'){
                result.innerHTML="";
            }

            let box = document.createElement('div');
            let detail = `<div class="detail">
                        <div class="part1 ${color}">${gender}</div>
                        <div class="part2">
                            <div class="up">身高/ <span>${howtall.value}</span><i>cm</i> 體重/ <span>${howweight.value}</span><i>kg</i></div>
                            <div class="down">BMI <span>${thebmi}</span> <b>${notice}</b></div>
                        </div>
                        <div class="part3"> <a href="####" onclick="d(event)">X</a> </div>
                        </div>`
            box.innerHTML = detail;
            result.appendChild(box);
            // 計算總筆數
            countdetails();
            // 清空輸入值和勾選
            howtall.value = '';
            howweight.value = '';
            // gen[0].removeAttribute("checked");
            gen[0].checked=false;
            gen[1].checked=false;
            console.log(gen[0]);
        })

        // <a>的單一刪除
        function d(event){    
            let papa = event.target.parentNode.parentNode;
                    // console.log(papa);
                    papa.parentNode.removeChild(papa);
                    console.log('刪除成功'+papa);
                    // 計算總筆數
                    countdetails();
        }

        // 清除全部detail

        let deleteall = document.querySelector('#deleteall a');
        
        deleteall.addEventListener('click',function(e){
            result.innerHTML='<div class="zero">請輸入資料</div>';
            // 計算總筆數 
            countdetails(); 

        })

        // backImg更換
        let backImg = document.querySelectorAll('.photo');
        let body = document.body;
        for(i=0;i<backImg.length;i++){
            backImg[i].addEventListener('click',function(e){
                for(j=0;j<backImg.length;j++){
                    backImg[j].style.border='5px solid gray';
                }
                let imgName =this.children[0].getAttribute('src');
                body.style.backgroundImage= 'url('+imgName+')';
                this.style.border='5px solid rgb(209, 28, 28)';
            })
        };

        