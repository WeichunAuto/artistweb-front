import { createSlice } from "@reduxjs/toolkit";

const sectionRenderStatusSlice = createSlice({
    name: 'screenSize',
    initialState: {
        isForeGroundImageRended: false,
        isPaintWorksSectionRended: false,
        isAboutMeSectionRender: false,
        isContactSectionRender: false

    },
    reducers: {
        setIsForeGroundImageRended(state, action) {
            state.isForeGroundImageRended = action.payload
        },
        setIsPaintWorksSectionRended(state, action) {
            state.isPaintWorksSectionRended = action.payload
        },
        setIsAboutMeSectionRender(state, action) {
            state.isAboutMeSectionRender = action.payload
        },
        setIsContactSectionRender(state, action) {
            state.isContactSectionRender = action.payload
        }
    }
})

const {setIsForeGroundImageRended, setIsPaintWorksSectionRended, setIsAboutMeSectionRender, setIsContactSectionRender} = sectionRenderStatusSlice.actions

const reducer = sectionRenderStatusSlice.reducer

export {setIsForeGroundImageRended, setIsPaintWorksSectionRended, setIsAboutMeSectionRender, setIsContactSectionRender}
export default reducer