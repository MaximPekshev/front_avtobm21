<template>
    <div v-if="properties" class="tab-content">
        <div v-for="(group, key) in computedProperties" :key="group.id" class="additional_info_list">
            <h4 class="info_title">{{ key }}</h4>
            <ul class="ul_li_block">
                <li v-for="(property, key) in group" :key="property.id">{{ key }}: {{ property }}</li>
            </ul>
        </div>
    </div>
</template>

<script>
export default {
    name: "AdvItemPropertiesComponent",
    props: ["properties"], 
    computed: {
        computedProperties () {
            return this.propertiesByGroup()
        }
    },
    methods: {
        propertiesByGroup () {
            let propertiesByGroup = {}
            let uniqueGroups = []
            // получаем уникальные имена групп характеристик
            this.properties.forEach((groupEl) => {
                if (uniqueGroups.indexOf(groupEl.property.group.name) === -1) {
                    uniqueGroups.push(groupEl.property.group.name)
                }
            })
            if (uniqueGroups.length > 0) {
                uniqueGroups.forEach((uniqueGroupName) => {
                    let propertiesList = {}
                    // выбираем характеристики с необходимым именем группы хар-к и добавляем в объект
                    this.properties.forEach((property) => {
                        if (property.property.group.name === uniqueGroupName) {
                            propertiesList[property.property.name] = property.value
                        }
                    })
                    // формируем финальный объект свойств с разбивкой по группам свойств
                    if (Object.keys(propertiesList).length > 0) {
                        propertiesByGroup[uniqueGroupName] = propertiesList
                    }
                })
            }
            return propertiesByGroup
        }
    }
}
</script>