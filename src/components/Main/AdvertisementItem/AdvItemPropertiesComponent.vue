<template>
    <div v-if="properties" class="tab-content">
        <div v-for="(group, key) in computedProperties" :key="group.id" class="additional_info_list">
            <h4 class="info_title">{{ key }}</h4>
            <ul class="ul_li_block">
                <li v-for="property in group" :key="property.id">{{ property.name }}: {{ property.value }}</li>
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
                let newElement = {
                    "name": groupEl.property.group.name,
                    "ordering": Math.floor(groupEl.property.group.ordering)
                }
                if (!uniqueGroups.find(item => item.name === groupEl.property.group.name)) {
                    uniqueGroups.push(newElement) 
                }
            })
            uniqueGroups.sort((item1, item2) => item1['ordering'] > item2['ordering'] ? 1 : -1)
            if (uniqueGroups.length > 0) {
                uniqueGroups.forEach((uniqueGroupItem) => {
                    let propertiesList = []
                    // выбираем характеристики с необходимым именем группы хар-к и добавляем в объект
                    this.properties.forEach((property) => {
                        let newPropElement = {
                            "name": property.property.name,
                            "ordering": Math.floor(property.property.ordering),
                            "value": property.value
                        }
                        if (property.property.group.name === uniqueGroupItem.name) {
                            // propertiesList[property.property.name] = property.value
                            propertiesList.push(newPropElement)
                        }
                    })
                    propertiesList.sort((item1, item2) => item1['ordering'] > item2['ordering'] ? 1 : -1)
                    // формируем финальный объект свойств с разбивкой по группам свойств
                    if (Object.keys(propertiesList).length > 0) {
                        propertiesByGroup[uniqueGroupItem.name] = propertiesList
                    }
                })
            }
            return propertiesByGroup
        }
    }
}
</script>