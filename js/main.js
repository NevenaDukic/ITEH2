$('#dodajForm').submit(function(){
    //#dodajForm imamo u home.php 

    event.preventDefault();
    console.log("Dodaj je pokrenuto");
    const $form = $(this);
    //uzimamo iz onih polja podatke
    const $inputs = $form.find('input, select, button, textarea');
    //serialiyujemo podatke d abi mogao da ih pokupi
    const serijalizacija = $form.serialize();



    //kreira objekat iz forme u json formatu
    let red_za_unos = $form.serializeArray().reduce(function(json,{name,value}){

        json[name] = value;
        return json;

    });
    
    console.log("Red za unos");
    console.log(red_za_unos);
    
    console.log(serijalizacija);
    
    request = $.ajax({
        //koju metodu zelim da obradim ->post
        url:'handler/add.php',
        type:'post',
        data:serijalizacija
    });

    //kada se izvrsi onda gledamo sta je odgovor
    request.done(function(response, textStatus, jqXHR){
        if(response==="Success"){
            alert("Kolokvijum je zakazan");
            console.log("Uspesno zakazivanje");
            //location.reload(true); -> ne radi se reload kad se koristi ajax
            appendRow(red_za_unos);
        }
        else console.log("Kolokvijum nije zakazan "+ response);
        console.log(response);
    });

    //ako se desi greska 
    request.fail(function(jqXHR, textStatus, errorThrown){
        console.error('Sledeca greska se desila: '+textStatus, errorThrown)
    });

});


function appendRow(row)
{
    $.get("handler/getLast.php",function(data){
        console.log(data);
        //data odgovor koji dobijamo od phpa
        $("#pregled tbody").append(

            //ojno json sto smo gore stavili omogucava da pisemo row.predmet
            `
            <tr>
                    <td>${row.value}</td>
                    <td>${row.katedra}</td>
                    <td>${row.sala}</td>
                    <td>${row.datum}</td>
                    <td>
                        <label class="custom-radio-btn">
                            <input type="radio" name="checked-donut" value=${data}>
                            <span class="checkmark"></span>
                        </label>
                    </td>

                </tr>
            
            
            `


        );
    })

}