Modals = {};


Modals.errorModal = function (title, doc) {
	var errorModalData = {
	    template: Template.errorModal,
	    title: title,
	    removeOnHide: true,
	    modalDialogClass: "share-modal-dialog", //optional
	    modalBodyClass: "share-modal-body", //optional
	    modalFooterClass: "share-modal-footer",//optional
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