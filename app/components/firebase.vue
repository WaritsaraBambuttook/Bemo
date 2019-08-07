<template>
    <Page>
         <ActionBar title="Firebase Vue demo"></ActionBar>

        <StackLayout>
            <Label v-for="tag in tagID" :key="tag.id" textWrap="true" horizontalAlignment="center">UUID = {{tag}}</Label>
        </StackLayout>
    </Page>
</template>
<script>

const firebase = require("nativescript-plugin-firebase");
export default {
    data(){
        return{
            tagID:[],
        }
    },
     mounted() {
            const user = firebase.firestore.collection("user");
            user.get({ source: "server" }).then(querySnapshot => {
            querySnapshot.forEach(doc => {
                console.log(`${doc.data().id} => ${JSON.stringify(doc.data())}`);
                this.tagID.push(doc.data().id);
            });
});
     },
    methods: {
        
    },
}
</script>
<style scoped>
  .home-panel {
        vertical-align: center;
        font-size: 20;
        margin: 15;
    }

    .description-label {
        margin-bottom: 15;
    }
</style>