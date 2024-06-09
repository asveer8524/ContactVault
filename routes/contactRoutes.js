const express=require("express");
const router=express.Router();
const {getContacts,getContactsById,postContacts,updateContacts,deleteContacts} = require("../controllers/contactControllers");
const validateToken=require("../middleware/validateTokenHandler");

router.use(validateToken);
router.route('/').get(getContacts).post(postContacts);
router.route('/:id').get(getContactsById).put(updateContacts).delete(deleteContacts);

/*
other Way

router.route('/').get(getContacts);

router.route('/').post(postContacts);

router.route('/:id').get(getContactsById);

router.route('/:id').put(updateContacts);

router.route('/:id').delete(deleteContacts);
*/
module.exports = router;