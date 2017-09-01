window.onload=function(){
    console.log("page load!");
    if( document.getElementById('edit-f-package-2-date-2017-08-29').checked)
        {
            document.getElementById('edit-f-package-2-date-2017-08-29').click()
            document.getElementById('edit-ds-wrapper-submit-footer').click()
        }
    else if(document.getElementsByClassName('alert alert-block alert-error')!=null)
    {
        document.getElementById('edit-ds-wrapper-submit-footer').click()
    }
}