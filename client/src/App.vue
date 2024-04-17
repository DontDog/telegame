<template>
  <div class="dark-theme">
    <div class="stripes">
      <table class="center">
        <tr>
          <td>
            <div class="black">
              <img class="stone" v-for="index in col1" :key="index" src="@/assets/0605f346a7b1922.png">
            </div>
          </td>
        </tr>
        <tr>
          <td>
            <div class="gray">
              <img class="stone" v-for="index in col2" :key="index" src="@/assets/0605f346a7b1933.png">
            </div>
          </td>
        </tr>
        <tr>
          <td>
            <div class="white">
              <img class="stone" v-for="index in col3" :key="index" src="@/assets/0605f346a7b1944.png">
            </div>
          </td>
        </tr>
        <tr>
          <td>
            <div class="gold">
              <img class="stone" v-for="index in col4" :key="index" src="@/assets/0605f346a7b1955.png">
            </div>
          </td>
        </tr>
        <tr>
          <td>
            <div class="red">
              <img class="stone" v-for="index in col5" :key="index" src="@/assets/0605f346a7b1966.png">
            </div>
          </td>
        </tr>
        <tr>
          <td>
            <div class="green">
              <img class="stone" v-for="index in col6" :key="index" src="@/assets/0605f346a7b1977.png">
            </div>
          </td>
        </tr>
      </table>
    </div>
    
    <div class="actions">
      <button class="black" @click="take">Взять</button>
      <button class="black" @click="skip">Пропустить</button>
    </div>
    
    <div class="pouch"></div>
  </div>
</template>

<script>

export default {
  sockets: {
    connect: function(){
      this.sockets.unsubscribe('join', {'name':thise.$route.query.name, 'room':thise.$route.query.room});
    },
    resol: function(data){
      this.col1 = data.col_black;
      this.col2 = data.col_grey;
      this.col3 = data.col_white;
      this.col4 = data.col_gold;
      this.col5 = data.col_red;
      this.col6 = data.col_green;
    }
  },
  methods: {
    take() {
      this.sockets.unsubscribe('take');
    },
    skip() {
      this.sockets.unsubscribe('skip');
    }
  }
}
</script>

<style>
.dark-theme {
  background-color: #333; /* темно-серый цвет */
  color: white;
  height: 100vh; /* растянуть на весь экран */
  display: flex;
  flex-direction: column;
  justify-content: space-between;
}

.actions {
  margin-top: auto;
  display: block;
  justify-content: space-around;
}

button {
  width: 100%;
  height: 7vh;
  margin: 10px;
  padding: 10px 20px;
}

.stripes {
  display: flex;
  flex-direction: column;
  align-items: center;
}

table.center {
  margin: 0 auto;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}

td {
  padding: 10px; /* Добавим отступ вокруг ячейки */
} 

.black, .gray, .white, .gold, .red, .green {
  margin: 10px;
  height: 40px; /* Настройте высоту по необходимости или уберите */
  width: 80vh; /* Растянуть по ширине */
  background-color: #555;  /* Настройте цвет фона по необходимости */
}

.stone {
  height: 40px; /* Настройте высоту по необходимости */
  width: 40px;
}

</style>