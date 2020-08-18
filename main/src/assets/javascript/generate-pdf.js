//creator: Nguyễn Xuân Hùng
export function printPdf(){
document.querySelector("#printPageButton").addEventListener("click", function() {
     window.print();
});
$("#generate").click(function () {
    let doc = new jsPDF('p', 'pt', 'a4');
    $("#container").css("width","100%");
    $("#container").css("background-color","#FFFFFF");
    doc.addHTML($("#container"), function () {
        doc.save('invoice_'+$("#code span").text()+'.pdf');
        $("#container").css("width","60%");
    });
});
}
    


