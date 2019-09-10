<template>
  <Page class="page">
   <ActionBar title="Action Items">
        <ActionItem @tap="onDelete"
            ios.systemIcon="16" ios.position="right"
            text="delete" android.position="popup">
            </ActionItem>
        </ActionBar>
    
    <StackLayout backgroundColor="#3399CC" orientation="vertical" horizontalAlignment="center" >
        
        <StackLayout >
            <GridLayout columns="auto, *, auto" rows="auto, 25" verticalAlignment="top" backgroundColor="lightgray">
                <Image src="~/img/1.jpg" rowSpan="2" width="100" height="100" margin="5" verticalAlignment="top"/>
                <Label text="name" textWrap="true" col="1" colSpan="1"  minHeight="50" fontSize="20" margin="10" horizontalAlignment="center" />
                <Label text="point" col="1" row="0" fontSize="14"  horizontalAlignment="center" verticalAlignment="bottom" /> 
            </GridLayout>
       
            <DockLayout width="100%" height="7%" backgroundColor="black" stretchLastChild="false">
                <Label class="text-center" text="search around me" dock="left" width="80%" height="70" color="white" fontSize="25"/>
                <Switch checked="false" class="m-15"  dock="right" color="white" backgroundColor="white"/>
                <!-- <Label text="top" dock="top" width="30%" height="70" backgroundColor="green"/> -->
            </DockLayout>
        </StackLayout>
        
        <ScrollView>
            <GridLayout rows="*" columns="*">
                 <StackLayout>
                <FlexboxLayout flexDirection="column" margin="10">
                    <Label text="Edit" height="auto" fontSize="20" />
                </FlexboxLayout>
                <DockLayout class="device" width="100%" height="auto" backgroundColor="black" stretchLastChild="false">
                    <Label class="text-center" text="nameDevice" dock="left" width="80%" height="auto"  fontSize="20" color="white" />
                    <button text="Sound"   fontSize="12"></button>
                </DockLayout>
                
                <GridLayout rows="50,auto,*" columns="auto, auto,*" >
                    <Button text="Add Item" @tap="GotoApp" fontSize="18" row="1" col="2" ></Button>
                </GridLayout>
            </StackLayout >
            </GridLayout>
           
        </ScrollView>

        <GridLayout rows="*" columns="*"  >
            <DockLayout stretchLastChild="false" >
                    <SegmentedBar :items="segmentedBarItems" v-model="selectedBarIndex" dock="bottom" width="100%"  />
            </DockLayout>
         </GridLayout>
    </StackLayout> 
  </Page>
</template>

<script>
import { log } from 'util';
import pageApp from './App';
export default {
  data() {
    return {
           segmentedBarItems: function() {
                var segmentedBarModule = require("tns-core-modules/ui/segmented-bar");
                let segmentedBarItem1 = new segmentedBarModule.SegmentedBarItem();
                segmentedBarItem1.title = "My Item";
                let segmentedBarItem2 = new segmentedBarModule.SegmentedBarItem();
                segmentedBarItem2.title = "Publish";
                if(segmentedBarItem1){
                    console.log("My Item");
                    
                }else{
                    console.log("Publish")
                }
                
                return [segmentedBarItem1, segmentedBarItem2];
            }(),
            selectedBarIndex: 0,
    };
  },
  methods: {
        onDelete:function onDelete(args) {
            console.log("Delete action item tapped.");
        },
       GotoApp: function(){
           console.log("Page B Button was pressed");
           this.$navigateTo(pageApp);
           
       } ,
       
       

  }
};
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
.device{
    margin: 5;
}

</style>
