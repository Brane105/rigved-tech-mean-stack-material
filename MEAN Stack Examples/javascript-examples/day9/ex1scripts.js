function validateRegistration() {
    var regForm = document.reg; // document -> form: reg
    var firstname = regForm.fn; // form -> HTMLElement:fn ==> <input name = "fn">
    var lastname = regForm.ln; // form -> HTMLElement:ln =-> <input name = "ln">
    var pass = regForm.pw;
    var confirmPass = regForm.cpw;
    var gender = regForm.gen;
    var technology = regForm.tech;
    
    if(firstname.value.length < 3) {
        alert('Firstname must be morethan 3 characters');
        return false;
    }
    if(lastname.value.length < 1) {
        alert('Lastname must be atleast 1 character');
        return false;
    }
    if(pass.value.length < 3) {
        alert('Password must be morethan 3 characters');
        return false;
    }
    if(pass.value != confirmPass.value) {
        alert("Password & Confirm Password must be same");
        return false;
    }
    // var flag = false;
    // for(var i = 0; i < gender.length; i++) {
    //     if(gender[i].checked) {
    //         flag = true;
    //     }
    // }
    // if(flag == false) {
    //     alert("Gender must be selected");
    //     return false;
    // }
    if(gender.value.length < 1) {
        alert('Gender should be selected');
        return false;
    }
    var flag = false;
    for(var i = 0; i < technology.length; i++) {
        if(technology[i].checked) {
            flag = true;
        }
    }
    if(flag == false) {
        alert('Atleast one skill must be selected');
        return false;
    }
    return true;
}