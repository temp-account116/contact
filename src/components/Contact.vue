<template>
    <div class="contact col-md-8" >
       <div class="col-sm-offset-2">
       <button type="button" class="btn btn-success new-contact-button" v-on:click="newContact">Add new contact</button>
        <table class="table contact-table">
            <thead>
                <tr>
                    <th>
                        #
                    </th>
                    <th>
                        First Name
                    </th>
                    <th>
                        Last Name
                    </th>
                    <th>
                        Email
                    </th>
                    <th>
                        Description
                    </th>
                    <th>
                        Actions
                    </th>
                </tr>
            </thead>
            <tbody>
                <tr v-for="contact in contacts">
                    <th scope="row">
                      {{ contact.id }}
                    </th>
                    <td>
                      {{ contact.first_name }}
                    </td>
                    <td>
                      {{ contact.last_name }}
                    </td>
                    <td>
                      {{ contact.email }}
                    </td>
                    <td>
                      {{ contact.description }}
                    </td>
                    <td>
                       <button type="button" class="btn btn-primary" v-on:click="edit(contact.id)">Edit</button>
                       <button type="button" class="btn btn-danger" v-on:click="destroy(contact.id)">Destroy</button>
                    </td>
                </tr>
            </tbody>
        </table>
    </div>
    <form class="form-horizontal" action="http://localhost:8089/contacts" method="post" v-on:submit.prevent="onSubmit">
       <input class="form-control hidden" v-model="contact.id">
        <div class="form-group">
            <label class="control-label col-sm-2" for="email">
                Email:
            </label>
            <div class="col-sm-10">
                <input v-validate="'required|email'"
                    :class="{'input': true, 'is-danger': errors.has('email') }" name="email" type="text" placeholder="Email" class="form-control" v-model="contact.email">
                <span v-show="errors.has('email')" class="pull-left help is-danger">{{ errors.first('email') }}</span>
            </div>
        </div>
        <div class="form-group">
            <label class="control-label col-sm-2">
                First Name:
            </label>
            <div class="col-sm-10">
                <input type="First Name" class="form-control" placeholder="Enter First Name" name="first_name" v-model="contact.first_name" v-validate="'required'"
                    :class="{'input': true, 'is-danger': errors.has('first_name') }" />
                <span v-show="errors.has('first_name')" class="pull-left help is-danger">{{ errors.first('first_name') }}</span>
            </div>
        </div>
        <div class="form-group">
            <label class="control-label col-sm-2">
                Last Name:
            </label>
            <div class="col-sm-10">
                 <input class="form-control" placeholder="Enter Last Name" name="last_name" v-model="contact.last_name" v-validate="'required'"
                        :class="{'input': true, 'is-danger': errors.has('last_name') }" />
                 <span v-show="errors.has('last_name')" class="pull-left help is-danger">{{ errors.first('last_name') }}</span>
            </div>
        </div>
        <div class="form-group">
            <label class="control-label col-sm-2" >
                Description:
            </label>
            <div class="col-sm-10">
                <textarea class="form-control" rows="3" placeholder="Description" name="description" v-model="contact.description"
                    v-validate="'required'" :class="{'input': true, 'is-danger': errors.has('last_name') }">
                </textarea>
                <span v-show="errors.has('description')" class="pull-left help is-danger">{{ errors.first('description') }}</span>
            </div>
        </div>
        <div class="form-group">
            <div class="col-sm-offset-2 col-sm-10">
                <button type="submit" class="btn btn-default">
                    {{ !!contact.id ? 'Edit': 'Create' }}
                </button>
            </div>
        </div>
    </form>
    </div>
</template>

<script>
    export default {
        name : 'Contact',
        data() {
            this.$http.get(this.getUrl()).then(function(response){
               this.contacts = response.body;
            }, function(error){
               this.$swal({text: "Cannot load contacts.", type: "error"});
            });
            return { 'contact': {},
                     'contacts': [] }
        },
        methods: {
          getUrl() { return 'http://localhost:8089/contacts'},
          success(message) { this.$swal({text: message, type: "success"}) }, // TODO: put these method in utility
          error(message) { this.$swal({text: message, type: "error"}) }, // TODO: put these method in utility
          setContact(newContact) {
            this.contact = newContact;
          },
          clearContact() {
            this.setContact({});
          },
          onSubmit: function(e) {
              // TODO: find a better to check error
              if( !!!this.contact.email || !!!this.contact.first_name || !!!this.contact.last_name || !!!this.contact.description){
                 this.error("Invalid input");
              }else{
                  // rails handle `create`/`update` in one form, hope I can do similary thing in vue...
                  if(!!this.contact.id){
                    this.$http.put(this.getUrl() + '/' + this.contact.id, this.contact).then(function(data){
                      this.clearContact();
                      this.success("Updated successfully.");
                    }, function(){
                      this.error("Something is wrong.");
                    });
                  }else{
                    this.$http.post(this.getUrl(), this.contact).then(function(data){
                      this.contact.id = data.body.id;
                      this.contacts.push(this.contact);
                      this.clearContact();
                      this.success("Created successfully.");
                    }, function(){
                      this.error("Something is wrong.");
                  });
                }
              }
            return false;
          },
          destroy: function(id){
             this.$http.delete(this.getUrl() + "/" + id).then(function(response){
                  this.contacts = this.contacts.filter(function (contact) {
                      return contact.id != id;
                  });
                  this.success("Deleted successfully.");
             },function(){
                  this.error("Something is wrong.");
             });
          },
          edit: function(id){
            var contact = _.find(this.contacts, function(contact){
              return contact.id == id
            });

            this.setContact(contact);
          },
          newContact: function(){
            this.clearContact();
          }
        }
    }
</script>

<style>
.is-danger{
  color: #a94442;
}
.new-contact-button{
  float: right;
  margin-bottom: 20px;
  margin-right: 10px;
}
.contact-table{
  text-align: right;
}
</style>
