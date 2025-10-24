import axios from 'axios'
import { notFound } from 'next/navigation'
import { baseurl, imgurl } from '../../components/apis'
import { 
  FaCalendar, 
  FaUser, 
  FaClock, 
  FaEye, 
  FaTag,
  FaArrowLeft,
  FaShare,
  FaBookmark,
  FaListUl,
  FaHeading
} from 'react-icons/fa'
import Link from 'next/link'

const Page = async ({ params: { slug } }) => {
  let data
  try {
    const response = await axios.get(`${baseurl}/blog/${slug}`)
    data = response.data
    if (!data.success) {
      notFound()
    }
  } catch (error) {
    notFound()
  }

  const blog = data.blog

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    })
  }

  // Function to strip HTML tags for meta description
  const stripHtml = (html) => {
    return html.replace(/<[^>]*>/g, '')
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Navigation */}
      <nav className="bg-white shadow-sm border-b border-gray-200">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-4">
            <Link 
              href="/admin/blog"
              className="flex items-center text-gray-600 hover:text-gray-900 transition-colors"
            >
              <FaArrowLeft className="mr-2" />
              Back to Blogs
            </Link>
            <div className="flex items-center space-x-4">
              <button className="p-2 text-gray-400 hover:text-gray-600 transition-colors">
                <FaBookmark size={18} />
              </button>
              <button className="p-2 text-gray-400 hover:text-gray-600 transition-colors">
                <FaShare size={18} />
              </button>
            </div>
          </div>
        </div>
      </nav>

      <article className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Blog Header */}
        <header className="mb-8 text-center">
          {/* Tag */}
          <div className="flex flex-wrap justify-center gap-2 mb-4">
            <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-blue-100 text-blue-800">
              <FaTag className="mr-1" size={12} />
              {blog.tag}
            </span>
          </div>

          {/* Title */}
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6 leading-tight">
            {blog.title}
          </h1>

          {/* Meta Information */}
          <div className="flex flex-wrap justify-center items-center gap-6 text-gray-600 mb-8">
            <div className="flex items-center">
              <FaUser className="mr-2 text-gray-400" />
              <span className="font-medium">{blog.author}</span>
            </div>
            <div className="flex items-center">
              <FaCalendar className="mr-2 text-gray-400" />
              <time dateTime={blog.createdAt}>
                {formatDate(blog.createdAt)}
              </time>
            </div>
            <div className="flex items-center">
              <FaClock className="mr-2 text-gray-400" />
              <span>{blog.readingTime} min read</span>
            </div>
            <div className="flex items-center">
              <FaEye className="mr-2 text-gray-400" />
              <span>{blog.views} views</span>
            </div>
          </div>

          {/* Multiple Images Gallery */}
          {blog.images && blog.images.length > 0 && (
            <div className="mb-8">
              {blog.images.length === 1 ? (
                // Single image
                <div className="rounded-2xl overflow-hidden shadow-lg">
                  <img
                    src={`${imgurl}/${blog.images[0]}`}
                    alt={blog.title}
                    className="w-full h-64 md:h-96 object-cover"
                  />
                </div>
              ) : (
                // Multiple images grid
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {blog.images.map((image, index) => (
                    <div key={index} className="rounded-2xl overflow-hidden shadow-lg">
                      <img
                        src={`${imgurl}/${image}`}
                        alt={`${blog.title} - Image ${index + 1}`}
                        className="w-full h-64 object-cover"
                      />
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}
        </header>

        {/* Blog Content */}
        <div className="bg-white rounded-2xl shadow-sm border border-gray-200 overflow-hidden">
          {/* Main Description */}
          {blog.description && (
            <div className="p-6 md:p-8 lg:p-12 border-b border-gray-200">
              <div 
                className="prose prose-lg max-w-none 
                          prose-headings:text-gray-900
                          prose-p:text-gray-700 prose-p:leading-relaxed
                          prose-a:text-blue-600 prose-a:no-underline hover:prose-a:underline
                          prose-strong:text-gray-900
                          prose-em:text-gray-700
                          prose-blockquote:border-l-blue-500 prose-blockquote:bg-blue-50 prose-blockquote:py-1
                          prose-ul:text-gray-700 prose-ol:text-gray-700
                          prose-li:leading-relaxed
                          prose-code:bg-gray-100 prose-code:px-1 prose-code:rounded
                          prose-pre:bg-gray-900 prose-pre:text-gray-100"
                dangerouslySetInnerHTML={{ __html: blog.description }}
              />
            </div>
          )}

          {/* Sections */}
          {blog.sections && blog.sections.length > 0 && (
            <div className="p-6 md:p-8 lg:p-12">
              <h2 className="text-2xl font-bold text-gray-900 mb-8 flex items-center">
                <FaHeading className="mr-3 text-blue-600" />
                Article Sections
              </h2>
              
              <div className="space-y-12">
                {blog.sections.map((section, sectionIndex) => (
                  <section key={sectionIndex} className="border-l-4 border-blue-500 pl-6">
                    {/* Section Heading */}
                    <h3 className="text-xl font-bold text-gray-900 mb-4">
                      {section.heading}
                    </h3>

                    {/* Section Paragraphs */}
                    {section.paragraphs && section.paragraphs.length > 0 && (
                      <div className="mb-6 space-y-4">
                        {section.paragraphs.map((paragraph, paraIndex) => (
                          <p key={paraIndex} className="text-gray-700 leading-relaxed">
                            {paragraph}
                          </p>
                        ))}
                      </div>
                    )}

                    {/* Section Key Points */}
                    {section.points && section.points.length > 0 && (
                      <div className="bg-gray-50 rounded-lg p-6">
                        <h4 className="font-semibold text-gray-900 mb-4 flex items-center">
                          <FaListUl className="mr-2 text-green-600" />
                          Key Points
                        </h4>
                        <ul className="space-y-3">
                          {section.points.map((point, pointIndex) => (
                            <li key={pointIndex} className="flex items-start">
                              <span className="inline-flex items-center justify-center w-6 h-6 bg-green-100 text-green-800 rounded-full text-sm font-medium mr-3 mt-1 flex-shrink-0">
                                {pointIndex + 1}
                              </span>
                              <span className="text-gray-700">{point}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    )}
                  </section>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Blog Footer */}
        <footer className="mt-12 pt-8 border-t border-gray-200">
          <div className="flex flex-col sm:flex-row justify-between items-center gap-4">
            <div className="flex items-center text-gray-600">
              <FaUser className="mr-2" />
              <span>Written by <strong>{blog.author}</strong></span>
            </div>
            
            <div className="flex items-center space-x-4">
              <span className="text-gray-500 text-sm">
                Last updated: {formatDate(blog.updatedAt)}
              </span>
            </div>
          </div>

          {/* Tag Section */}
          <div className="mt-8">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Category</h3>
            <div className="flex flex-wrap gap-2">
              <span className="inline-flex items-center px-4 py-2 rounded-full text-sm font-medium bg-gray-100 text-gray-700">
                <FaTag className="mr-1" size={12} />
                {blog.tag}
              </span>
            </div>
          </div>
        </footer>
      </article>

      {/* Related Posts Section */}
      <section className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="text-center mb-8">
          <h2 className="text-2xl font-bold text-gray-900">You might also like</h2>
          <p className="text-gray-600 mt-2">Discover more interesting articles</p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <div className="text-center py-8 text-gray-500">
            More blogs coming soon...
          </div>
        </div>
      </section>
    </div>
  )
}

export default Page

