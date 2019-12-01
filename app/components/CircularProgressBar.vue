<template>
  <GridLayout :height="height" :width="height">
    <RadRadialGauge>
      <RadialScale v-tkRadialGaugeScales startAngle="-90" sweepAngle="360">
        <ScaleStyle
          v-tkRadialScaleStyle
          ticksVisible="false"
          labelsVisible="false"
          lineThickness="0"
        ></ScaleStyle>

        <RadialBarIndicator v-tkRadialScaleIndicators minimum="0" maximum="100">
          <BarIndicatorStyle
            v-tkRadialBarIndicatorStyle
            :fillColor="fillBackgroundColor"
            cap="Round"
            barWidth="0.1"
          ></BarIndicatorStyle>
        </RadialBarIndicator>

        <RadialBarIndicator
          v-tkRadialScaleIndicators
          minimum="0"
          :maximum="value"
          isAnimated="true"
        >
          <BarIndicatorStyle
            v-tkRadialBarIndicatorStyle
            :fillColor="fillColor"
            cap="Round"
            barWidth="0.1"
          ></BarIndicatorStyle>
        </RadialBarIndicator>
      </RadialScale>
    </RadRadialGauge>
    <Label
      id="change"
      :text="text"
      :color="textColor"
      :fontSize="textSize"
      class="m-x-50 m-y-50"
      :marginTop="offset"
    ></Label>
    <Label
      id="change"
      :text="'Found '+num + ' devices'"
      :color="textColor"
      :fontSize="textSize"
      class="m-x-auto m-y-auto"
      :marginTop="offset"
    ></Label>
  </GridLayout>
</template>

<script>
import { getViewById } from "tns-core-modules/ui/page/page";
export default {
  props: {
    size: { default: 100 },
    progress: { default: 0 },
    offset: { default: 0 },
    textColor: { default: "#000000" },
    fillColor: { default: "#632605" },
    fillBackgroundColor: { default: "#ff752a" },
    num: { default: 0 }
  },
  computed: {
    height() {
      return Math.min(this.size, 250);
    },
    value() {
      return Math.min(this.progress, 100);
    },
    text() {
      return `${this.value.toFixed()}%`;
    },
    textSize() {
      return;
      this.height / 3.5;
    }
  },
  methods: {
    changeText: function() {}
  }
};
</script>

<style>
</style>
