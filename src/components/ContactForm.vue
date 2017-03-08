<template>
    <div class="contact col-md-8" >
        <table class="table col-sm-offset-2">
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
                </tr>
            </tbody>
        </table>


    <form class="form-horizontal" action="http://localhost:8089/contacts" method="post" v-on:submit.prevent="onSubmit">
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
                    Submit
                </button>
            </div>
        </div>
    </form>
    </div>
</template>

<script>
    export default {
        name : 'Contact',
        url : 'http://localhost:8089/contacts',
        ready: function(){
            console.log("ready");
        },
        data() {
            var url = 'http://localhost:8089/contacts';
            this.$http.get(url).then(function(response){
               this.contacts = response.body;
            }, function(error){
               // TODO: handle error
            });
            return { 'contact': {date : '', totalTime : '', comment : ''},
                     'contacts': [] }
        },
        methods: {
          onSubmit: function(e) {
              // TODO: find a better to check error
              if( !!!this.contact.email || !!!this.contact.first_name || !!!this.contact.last_name || !!!this.contact.description){
                  console.log("Contact has error");
                  // handle error
              }else{
                  this.$http.post(url, this.contact);
              }
            return false;
          }
        }
    }
</script>
