<template>
    <form class="form-horizontal" action="http://localhost:8089/contacts" method="post" v-on:submit.prevent="onSubmit">
        <div class="form-group">
            <label class="control-label col-sm-2" for="email">
                Email:
            </label>
            <div class="col-sm-10">
                <input type="email" class="form-control" id="email" placeholder="Enter email" name="email" v-model="contact.email"/>
            </div>
        </div>
        <div class="form-group">
            <label class="control-label col-sm-2">
                First Name:
            </label>
            <div class="col-sm-10">
                <input type="First Name" class="form-control" placeholder="Enter First Name" name="first_name" v-model="contact.first_name"/>
            </div>
        </div>
        <div class="form-group">
            <label class="control-label col-sm-2">
                Last Name:
            </label>
            <div class="col-sm-10">
                <input type="First Name" class="form-control" placeholder="Enter Last Name" name="last_name" v-model="contact.last_name"/>
            </div>
        </div>
        <div class="form-group">
            <label class="control-label col-sm-2" >
                Description:
            </label>
            <div class="col-sm-10">
                <textarea class="form-control" rows="3" placeholder="Description" name="description" v-model="contact.description">
                </textarea>
            </div>
        </div>
        <div class="form-group">
            <div class="col-sm-offset-2 col-sm-10">
                <button type="submit" class="btn btn-default" @click="onSubmit()">
                    Submit
                </button>
            </div>
        </div>
    </form>
</template>

<script>
    export default {
        name : 'Contact',
        ready: function(){
            return {}
        },
        data() {
            return {'contact': {date : '', totalTime : '', comment : ''} }
        },
        methods: {
          onSubmit: function(e) {
            var url = "http://localhost:8089/contacts"
            this.$http.post(url, this.contact);
          }
        }
    }
</script>
