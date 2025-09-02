import { AnimatePresence, motion } from 'motion/react'
import ClassItems from './ClassItems'
import type { IMasterClass } from '@/lib/types'

interface ClassGridProps {
  data: Array<IMasterClass>
  selectedClass: IMasterClass
  handleClassSelect: (classItem: IMasterClass) => void
  classIcons: Record<string, React.ElementType>
}

const containerVariants = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.12,
      delayChildren: 0.1,
    },
  },
}
const itemVariants = {
  hidden: { opacity: 0, y: 30 },
  show: {
    opacity: 1,
    y: 0,
    transition: { type: 'spring', stiffness: 80, damping: 18 },
  },
}

const ClassGrid = ({
  data,
  selectedClass,
  handleClassSelect,
  classIcons,
}: ClassGridProps) => {
  return (
    <motion.div
      className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-6 mb-8"
      variants={containerVariants}
      initial="hidden"
      animate="show"
    >
      <AnimatePresence>
        {data.map((classItem: IMasterClass) => {
          const isSelected = selectedClass.class_id === classItem.class_id

          return (
            <motion.div
              key={classItem.class_id}
              // @ts-ignore: motion.div 'layout' prop type mismatch with current version of motion/react, safe to ignore for layout animation
              variants={itemVariants}
              exit={{ opacity: 0, y: 30 }}
              layout
            >
              <ClassItems
                classItem={classItem}
                isSelected={isSelected}
                handleClassSelect={handleClassSelect}
                classIcons={classIcons}
              />
            </motion.div>
          )
        })}
      </AnimatePresence>
    </motion.div>
  )
}

export default ClassGrid
