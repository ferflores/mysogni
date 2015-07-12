Modals = {};


Modals.errorModal = function (title, doc) {
	var errorModalData = {
	    template: Template.errorModal,
	    title: title,
	    removeOnHide: true,
	    modalDialogClass: "share-modal-dialog",
	    modalBodyClass: "share-modal-body",
	    modalFooterClass: "share-modal-footer",
	    buttons: {
	      "ok": {
	        class: 'btn-info',
	        label: 'Cancel'
	      }
	    },
	    doc: doc
	  }

	  var rd = ReactiveModal.initDialog(errorModalData);

	  rd.show();
}

Modals.confirmModal = function(title, question, functionOk, functionNo){
	var confirmModalData = {
	    template: Template.confirmModal,
	    title: title,
	    removeOnHide: true,
	    modalDialogClass: "share-modal-dialog",
	    modalBodyClass: "share-modal-body",
	    buttons: {
	      "ok": {
	        class: 'btn-info',
	        label: 'Ok'
	      },
	      "no": {
	        class: 'btn-warning',
	        label: 'No'
	      }
	    },
	    doc: {question: question}
	  }

	  var rd = ReactiveModal.initDialog(confirmModalData);

	  rd.buttons.ok.on('click', function(){
	  	functionOk();
	  });

	  rd.buttons.no.on('click', function(){
	  	if(functionNo){
	  		functionNo();
	  	}
	  });

	  rd.show();
}